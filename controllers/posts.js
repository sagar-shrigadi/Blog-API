import { prisma } from "../lib/prisma";
import {
  createNewPost,
  deletePostById,
  getAllPost,
  getPostById,
} from "../models/post.js";

export const allPosts = async (req, res, next) => {
  const allPosts = await getAllPost();
  return res.status(200).json(allPosts);
};
export const newPost = async (req, res, next) => {
  // add content validation here

  // get userId from jwt to pass it as author to new post
  const { title, content } = req.body;
  const newPost = await createNewPost(title, content);
  return res.status(201).json(newPost);
};
export const selectPost = async (req, res, next) => {
  const postId = Number(req.params.postId);
  const selectPost = await getPostById(postId);
  res.status(200).json(selectPost);
};
export const editSelectPost = async (req, res, next) => {
  const postId = Number(req.params.postId);
  // add post validation here

  // get userId from jwt to pass as author
  const { title, content } = req.body;
  const editedPost = await (postId, title, content);
  res.status(204).json(editedPost);
};
export const deleteSelectPost = async (req, res, next) => {
  const postId = Number(req.params.postId);
  await deletePostById(postId);
  res.status(204).json({ msg: "successfully deleted" });
};
