import prisma from '../../prisma/client';

export const authService = {
  async findUserByEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }
};
