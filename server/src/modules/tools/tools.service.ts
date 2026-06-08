import prisma from '../../prisma/client';

export const toolsService = {
  async findAll() {
    return prisma.tools.findMany();
  }
};
