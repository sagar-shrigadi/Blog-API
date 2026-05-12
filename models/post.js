import { prisma } from "../lib/prisma.js";

export const getAllPost = async () => {
  return await prisma.post.findMany({
    include: { _count: { select: { comments: true } } },
    orderBy: { createdAt: "desc" },
  });
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
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: { select: { username: true } },
      comments: {
        include: { author: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
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
