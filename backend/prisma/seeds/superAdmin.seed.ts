import prisma from "@root/prisma.js";
import { hashPassword } from "@/utils/auth.js";

const USERS = [
    {
        firstName: "Super",
        lastName: "Admin",
        email: "superadmin@colab.com",
        password: "SuperAdmin@123",
    },
];

export async function seedSuperAdmin() {
    console.log("👑 Seeding admin users...");

    for (const userData of USERS) {
        const hashedPassword = await hashPassword(userData.password);

        await prisma.users.upsert({
            where: { email: userData.email },
            update: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                name: `${userData.firstName} ${userData.lastName}`,
                password: hashedPassword,
                role: "SUPERADMIN",
                isVerified: true,
                isActive: true,
            },
            create: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                password: hashedPassword,
                role: "SUPERADMIN",
                isVerified: true,
                isActive: true,
            },
        });

        console.log(`  ✅ ${userData.email} — role: SUPERADMIN`);
    }
}
