import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seed started");

  const users = [
    {
      name: "Admin User",
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      email: "admin@example.com",
      password: "adminpassword",
      phone_number: "9999999999",
    },
    {
      name: "Test Vendor",
      firstName: "Test",
      lastName: "Vendor",
      role: "VENDOR",
      email: "vendorme@example.com",
      password: "password123",
      phone_number: "8888888888",
    },
    {
      name: "Normal User",
      firstName: "Normal",
      lastName: "User",
      role: "USER",
      email: "normaluser@example.com",
      password: "userpassword",
      phone_number: "7777777777",
    },
  ];

  for (const userData of users) {
    const existingUser = await prisma.users.findUnique({ where: { email: userData.email } });
    const passwordHash = await bcrypt.hash(userData.password, 12);

    if (existingUser) {
      const existingAccount = await prisma.auth_accounts.findFirst({
        where: {
          provider: 'LOCAL',
          provider_account_id: userData.email,
        },
      });

      if (!existingAccount) {
        await prisma.auth_accounts.create({
          data: {
            id: crypto.randomUUID(),
            user_id: existingUser.id,
            provider: 'LOCAL',
            provider_account_id: userData.email,
            password_hash: passwordHash,
          },
        });
      }

      if (userData.role === 'VENDOR') {
        const existingVendor = await prisma.vendors.findUnique({
          where: { owner_user_id: existingUser.id },
        });

        if (!existingVendor) {
          await prisma.vendors.create({
            data: {
              owner_user_id: existingUser.id,
              company_name: `${userData.name} Tools`,
              company_email: userData.email,
              phone_number: userData.phone_number,
              verification_status: 'APPROVED',
            },
          });
        }
      }

      console.log(`Skipped existing user: ${existingUser.email}`);
      continue;
    }

    const data: any = {
      name: userData.name,
      email: userData.email,
      phone_number: userData.phone_number,
      role: userData.role as any,
      is_verified: true,
      is_active: true,
      auth_accounts: {
        create: {
          id: crypto.randomUUID(),
          provider: 'LOCAL',
          provider_account_id: userData.email,
          password_hash: passwordHash,
        },
      },
    };

    if (userData.role === 'VENDOR') {
      data.vendor = {
        create: {
          company_name: `${userData.name} Tools`,
          company_email: userData.email,
          phone_number: userData.phone_number,
          verification_status: 'APPROVED',
        },
      };
    }

    const user = await prisma.users.create({
      data,
    });

    console.log(`Created user: ${user.email} with role ${user.role}`);
  }

  console.log("Seed completed successfully");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });