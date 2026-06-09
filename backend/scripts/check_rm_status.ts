
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkRM() {
    const user = await prisma.user.findFirst({
        where: { email: 'rm.ujjwal@gmail.com' },
        include: { rm: true }
    });
    console.log("User:", user?.email);
    console.log("RM Record:", user?.rm);
}
checkRM().catch(console.error);
