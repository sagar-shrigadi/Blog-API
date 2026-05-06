import {
  createNewComment,
  deleteCommentById,
  editCommentById,
  getCommentById,
} from "../models/comment.js";

export const newComment = async (req, res, next) => {
  // get userId from req.user
  const postId = Number(req.params.postId);
  // add validation for message?
  const { message } = req.body;

  const newComment = await createNewComment(postId, message);
  return res.status(201).json(newComment);
};
export const selectComment = async (req, res, next) => {
  const commentId = Number(req.params.commentId);

  const selectComment = await getCommentById(commentId);

  return res.status(200).json(selectComment);
};
export const editSelectComment = async (req, res, next) => {
  const commentId = Number(req.params.commentId);

  // add comment validation here
  const { message } = req.body;
  const editedComment = await editCommentById(commentId, message);
  return res.status(204).json(editedComment);
};
export const deleteSelectComment = async (req, res, next) => {
  const commentId = Number(req.params.commentId);
  await deleteCommentById(commentId);
  res.status(204).json({ msg: "comment successfully deleted" });
};
