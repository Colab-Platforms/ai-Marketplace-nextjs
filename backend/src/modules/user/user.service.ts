import prisma from "@root/prisma.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { ApiError } from "@/utils/ApiError.js";
import STATUS_CODES from "@/utils/statusCodes.js";
import { hashPassword } from "@/utils/auth.js";
import {
    userSelectFields,
    CreateUserBody,
    UpdateUserBody,
    Role,
    ROLE_LEVEL,
} from "./user.types.js";
import { getPaginationOptions, formatPaginationResponse } from "@/utils/paginationUtils.js";
import { buildPrismaQuery } from "prisma-qb";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatUser = (user: any) => {
    // Calculate display role
    let role = "USER";
    if (user.userRoles) {
        const roleNames = user.userRoles.map((ur: any) => ur.role.name);
        if (roleNames.includes("SUPERADMIN") || roleNames.includes("SUPER_ADMIN")) role = "SUPERADMIN";
        else if (roleNames.includes("ADMIN")) role = "ADMIN";
    }

    if (user.rm) role = "RM";
    else if (user.company?.type) role = user.company.type.toUpperCase();

    return {
        ...user,
        role,
        createdAt: dayjs.utc(user.createdAt).tz(user.timezone || "Asia/Kolkata").format("YYYY-MM-DDTHH:mm"),
        updatedAt: dayjs.utc(user.updatedAt).tz(user.timezone || "Asia/Kolkata").format("YYYY-MM-DDTHH:mm"),
    };
};

class UserService {

    getHighestRole = (userRoles: { role: { name: string } }[]): string => {
        let highest = "USER";
        for (const ur of userRoles) {
            if ((ROLE_LEVEL[ur.role.name] ?? 0) > (ROLE_LEVEL[highest] ?? 0)) {
                highest = ur.role.name;
            }
        }
        return highest;
    };

    getVisibleRoles = (callerRole: Role): string[] => {
        const callerLevel = ROLE_LEVEL[callerRole] ?? 0;
        return Object.entries(ROLE_LEVEL)
            .filter(([, level]) => level < callerLevel)
            .map(([name]) => name);
    };

    ROLE_LEVEL: Record<string, number> = {
        USER: 1,
        ADMIN: 2,
        SUPERADMIN: 3,
    };

    async getAllUsers(query: any, callerRole: Role, callerId: number) {
        const { take, skip, page, pageSize } = getPaginationOptions(query, 10);

        const { where: qbWhere, orderBy } = buildPrismaQuery({
            query,
            searchFields: [
                { field: "firstName" },
                { field: "lastName" },
                { field: "email" },
            ],
            filterFields: [
                { key: "isActive", field: "isActive", type: "boolean" },
                { key: "isVerified", field: "isVerified", type: "boolean" },
            ],
            sortFields: [
                { key: "createdAt", field: "createdAt" },
                { key: "firstName", field: "firstName" },
                { key: "email", field: "email" },
            ],
            defaultSort: { key: "createdAt", order: "desc" },
            softDelete: { field: "isDeleted", value: false },
            allowedQueryKeys: ["page", "pageSize", "search", "isActive", "isVerified"],
        });

        const visibleRoles = this.getVisibleRoles(callerRole);

        const where = {
            ...qbWhere,
            id: { not: callerId },
            userRoles: {
                some: { role: { name: { in: visibleRoles } } },
            },
        };

        const [users, totalRecords] = await Promise.all([
            prisma.user.findMany({
                where,
                select: userSelectFields,
                skip,
                take,
                orderBy,
            }),
            prisma.user.count({ where }),
        ]);

        const formattedUsers = users.map(formatUser);
        return formatPaginationResponse(formattedUsers, totalRecords, page, pageSize);
    }


    async getUserById(targetId: number, callerRole: Role, callerId: number) {
        const user = await prisma.user.findFirst({
            where: { id: targetId, isDeleted: false },
            select: userSelectFields,
        });

        if (!user) {
            throw new ApiError("User not found", STATUS_CODES.NOT_FOUND);
        }

        if (callerRole === "USER" && callerId !== targetId) {
            throw new ApiError("You can only view your own profile", STATUS_CODES.FORBIDDEN);
        }

        if (callerId !== targetId) {
            const targetHighestRole = this.getHighestRole(user.userRoles);
            if ((this.ROLE_LEVEL[targetHighestRole] ?? 0) >= (this.ROLE_LEVEL[callerRole] ?? 0)) {
                throw new ApiError("You do not have permission to view this user", STATUS_CODES.FORBIDDEN);
            }
        }

        return formatUser(user);
    }


    async createUser(data: CreateUserBody) {
        const existingUser = await prisma.user.findFirst({
            where: { email: data.email, isDeleted: false },
        });
        if (existingUser) {
            throw new ApiError("Email already registered", STATUS_CODES.CONFLICT);
        }

        const roleRecord = await prisma.role.findUnique({ where: { name: "USER" } });
        if (!roleRecord) {
            throw new ApiError("USER role not found", STATUS_CODES.SERVER_ERROR);
        }

        const hashedPassword = await hashPassword(data.password);

        const user = await prisma.$transaction(async (tx: any) => {
            const createdUser = await tx.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    phone: data.phone ?? null,
                },
            });

            await tx.userRole.create({
                data: { userId: createdUser.id, roleId: roleRecord.id },
            });

            return tx.user.findUnique({
                where: { id: createdUser.id },
                select: userSelectFields,
            });
        });

        return formatUser(user);
    }


    async updateUser(targetId: number, data: UpdateUserBody, callerRole: Role, callerId: number) {
        const user = await prisma.user.findFirst({
            where: { id: targetId, isDeleted: false },
            include: { userRoles: { include: { role: true } } },
        });

        if (!user) {
            throw new ApiError("User not found", STATUS_CODES.NOT_FOUND);
        }

        // Self-update is always allowed
        if (callerId !== targetId) {
            // Regular user cannot update others
            if (callerRole === "USER") {
                throw new ApiError("You can only update your own account", STATUS_CODES.FORBIDDEN);
            }

            // Cannot update someone at or above your level
            const targetHighestRole = this.getHighestRole(user.userRoles);
            if ((this.ROLE_LEVEL[targetHighestRole] ?? 0) >= (this.ROLE_LEVEL[callerRole] ?? 0)) {
                throw new ApiError("You do not have permission to update this user", STATUS_CODES.FORBIDDEN);
            }
        }

        // Regular user cannot toggle isActive on themselves
        if (callerRole === "USER" && data.isActive !== undefined) {
            throw new ApiError("You do not have permission to change account active status", STATUS_CODES.FORBIDDEN);
        }

        const updatedUser = await prisma.user.update({
            where: { id: targetId },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                department: data.department,
                jobRole: data.jobRole,
                timezone: data.timezone,
                ...(data.isActive !== undefined && { isActive: data.isActive }),
                ...(data.companyId !== undefined && { companyId: data.companyId }),
            },
            select: userSelectFields,
        });

        return formatUser(updatedUser);
    }


    async deleteUser(targetId: number, callerRole: Role, callerId: number) {
        const user = await prisma.user.findFirst({
            where: { id: targetId, isDeleted: false },
            include: { userRoles: { include: { role: true } } },
        });

        if (!user) {
            throw new ApiError("User not found", STATUS_CODES.NOT_FOUND);
        }

        const targetHighestRole = this.getHighestRole(user.userRoles);

        // SUPERADMIN accounts can never be deleted
        if (targetHighestRole === "SUPERADMIN") {
            throw new ApiError("SUPERADMIN account cannot be deleted", STATUS_CODES.FORBIDDEN);
        }

        // Self-delete is allowed (unless SUPERADMIN, already handled above)
        if (callerId !== targetId) {
            // Regular user cannot delete others
            if (callerRole === "USER") {
                throw new ApiError("You can only delete your own account", STATUS_CODES.FORBIDDEN);
            }

            // Cannot delete someone at or above your level
            if ((this.ROLE_LEVEL[targetHighestRole] ?? 0) >= (this.ROLE_LEVEL[callerRole] ?? 0)) {
                throw new ApiError("You do not have permission to delete this user", STATUS_CODES.FORBIDDEN);
            }
        }

        await prisma.user.update({
            where: { id: targetId },
            data: { isDeleted: true, deletedAt: new Date() },
        });

        return { message: "User deleted successfully" };
    }
}

export default UserService;
