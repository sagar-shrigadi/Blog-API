import { prisma } from "../lib/prisma.js";

export const getUserAuth = async (username) => {
  return prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      password: true,
      admin: true,
    },
  });
};

export const insertUser = async (username, password) => {
  return prisma.user.create({
    data: {
      username,
      password,
    },
  });
};
