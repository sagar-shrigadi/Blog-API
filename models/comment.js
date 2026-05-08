import { prisma } from "../lib/prisma.js";

export const createNewComment = async (userId, postId, message) => {
  return await prisma.comment.create({
    data: {
      message,
      author: { connect: { id: userId } },
      post: { connect: { id: postId } },
    },
  });
};
export const getCommentById = async (commentId) => {
  return prisma.comment.findFirst({
    where: { id: commentId },
  });
};
export const editCommentById = async (commentId, message) => {
  return prisma.comment.update({
    where: { id: commentId },
    data: { message },
  });
};
export const deleteCommentById = async (commentId) => {
  return prisma.comment.delete({
    where: { id: commentId },
  });
};
