import prisma from "@root/prisma.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { hashPassword, comparePassword } from "@/utils/auth.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { RegisterBody, LoginBody } from "./auth.types.js";
import { sendPasswordResetEmail } from "@/utils/mailer.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatUser = (user: any) => {
    return {
        ...user,
        created_at: dayjs.utc(user.created_at).tz(user.timezone || "Asia/Kolkata").format("YYYY-MM-DDTHH:mm"),
        updated_at: dayjs.utc(user.updated_at).tz(user.timezone || "Asia/Kolkata").format("YYYY-MM-DDTHH:mm"),
    };
};

const resolveRole = (type?: string) => {
    if (type === "Vendor") return "VENDOR";
    return "USER";
};

class AuthService {
    async register(data: RegisterBody) {
        const [existingUser, hashedPassword] = await Promise.all([
            prisma.users.findFirst({ where: { email: data.email, isDeleted: false } }),
            hashPassword(data.password),
        ]);

        if (existingUser) {
            throw new ApiError("Email already registered", STATUS_CODES.CONFLICT);
        }

        const role = resolveRole(data.type);

        if(data.password!==data.confirmPassword){
            throw new ApiError("Password and confirm password do not match", STATUS_CODES.BAD_REQUEST);
        }

        const user = await prisma.users.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                name: `${data.firstName} ${data.lastName}`.trim(),
                email: data.email,
                phone_number: data.phone_number,
                password: hashedPassword,
                role,
                isVerified: true,
                isActive: true,
            },
        });

        if (!process.env.JWT_SECRET) {
            throw new ApiError("JWT secret is not defined", STATUS_CODES.SERVER_ERROR);
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                timezone: user.timezone,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return {
            user: formatUser(user),
            token,
            message: "Account created successfully. You are now signed in.",
        };
    }

    async forgotPassword(email: string) {
        const user = await prisma.users.findFirst({
            where: { email, isDeleted: false },
        });

        if (!user) {
            return { message: "If this email exists, a reset link has been sent." };
        }

        await prisma.passwordResetToken.updateMany({
            where: { user_id: user.id, used: false },
            data: { used: true },
        });

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = dayjs().add(1, "hour").toDate();

        await prisma.passwordResetToken.create({
            data: {
                user_id: user.id,
                token,
                expires_at: expiresAt,
            },
        });

        console.log(`[ForgotPassword] Queuing reset email to ${email}`);
        sendPasswordResetEmail(email, token).catch(err => {
            console.error(`[ForgotPassword] Failed to send reset email to ${email}:`, err);
        });

        return { message: "If this email exists, a reset link has been sent." };
    }

    async resetPassword(token: string, newPassword: string) {
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!resetToken || resetToken.used) {
            throw new ApiError("Invalid or expired reset link", STATUS_CODES.BAD_REQUEST);
        }

        if (dayjs().isAfter(resetToken.expires_at)) {
            throw new ApiError("Password reset link has expired. Please request a new one.", STATUS_CODES.BAD_REQUEST);
        }

        const hashed = await hashPassword(newPassword);

        await prisma.$transaction([
            prisma.users.update({
                where: { id: resetToken.user_id },
                data: { password: hashed },
            }),
            prisma.passwordResetToken.update({
                where: { id: resetToken.id },
                data: { used: true },
            }),
        ]);

        return { message: "Password reset successfully. You can now log in." };
    }

    async login(data: LoginBody) {
        const user = await prisma.users.findFirst({
            where: { email: data.email, isDeleted: false },
        });

        if (!user || !user.password) {
            throw new ApiError("No account found with this email", STATUS_CODES.UNAUTHORIZED);
        }

        const isPasswordValid = await comparePassword(data.password, user.password);
        if (!isPasswordValid) {
            throw new ApiError("Incorrect password", STATUS_CODES.UNAUTHORIZED);
        }

        const expectedRole = resolveRole(data.type);
        if (user.role !== expectedRole) {
            throw new ApiError(
                `This account is not registered as a ${data.type}`,
                STATUS_CODES.UNAUTHORIZED
            );
        }

        if (!process.env.JWT_SECRET) {
            throw new ApiError("JWT secret is not defined", STATUS_CODES.SERVER_ERROR);
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                timezone: user.timezone,
            },
            process.env.JWT_SECRET,
            { expiresIn: "90d" }
        );

        const { password, ...userWithoutPassword } = user;
        return { user: formatUser(userWithoutPassword), token };
    }
}

export default AuthService;
