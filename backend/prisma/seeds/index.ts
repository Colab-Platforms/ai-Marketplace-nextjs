import prisma from "@root/prisma.js";
import { seedSuperAdmin } from "./superAdmin.seed.js";

async function main() {
    console.log("🌱 Starting seed...");
    await seedSuperAdmin();
    console.log("✅ Seed completed successfully!");
}

main()
    .catch(e => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
