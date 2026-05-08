import { prisma } from "../lib/prisma.js";

export const getAllPost = async () => {
  return await prisma.post.findMany({ orderBy: { id: "asc" } });
};
export const createNewPost = async (
  userId,
  title,
  content,
  isPublished = false,
) => {
  return await prisma.post.create({
    data: {
      title,
      content,
      published: isPublished,
      author: {
        connect: { id: userId },
      },
    },
  });
};
export const getPostById = async (postId) => {
  return prisma.post.findFirst({
    where: { id: postId },
    include: { comments: { orderBy: { id: "asc" } } },
  });
};
export const editPostById = async (
  postId,
  title,
  content,
  isPublished = false,
) => {
  return prisma.post.update({
    where: { id: postId },
    data: { title, content, published: isPublished },
    include: { comments: { orderBy: { id: "asc" } } },
  });
};
export const deletePostById = async (postId) => {
  return prisma.post.delete({
    where: { id: postId },
  });
};
