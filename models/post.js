import { prisma } from "../lib/prisma";

export const getAllPost = async () => {
  return await prisma.post.findMany({ orderBy: { id: "asc" } });
};
export const createNewPost = async (title, content) => {
  return await prisma.post.create({
    data: {
      title,
      content,
    },
  });
};
export const getPostById = async (postId) => {
  return prisma.post.findFirst({
    where: { id: postId },
  });
};
export const editPostById = async (postId, title, content) => {
  return prisma.post.update({
    where: { id: postId },
    data: { title, content },
  });
};
export const deletePostById = async (postId) => {
  return prisma.post.delete({
    where: { id: postId },
  });
};
