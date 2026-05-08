import { prisma } from "../lib/prisma.js";
import {
  createNewPost,
  deletePostById,
  editPostById,
  getAllPost,
  getPostById,
} from "../models/post.js";

export const allPosts = async (req, res, next) => {
  try {
    const allPosts = await getAllPost();
    return res.status(200).json({ allPosts });
  } catch (error) {
    console.error("Get All Post Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const newPost = async (req, res, next) => {
  try {
    // add content validation here
    const { title, content, isPublished } = req.body;
    // get userId from jwt to pass it as author to new post
    const userId = Number(req.user.id);
    console.log("User Id From Req.User.Id after token auth", userId);
    const newPost = await createNewPost(userId, title, content, isPublished);
    return res.status(201).json({ newPost });
  } catch (error) {
    console.error("Create New Post Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const selectPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    const selectPost = await getPostById(postId);
    return res.status(200).json({ selectPost });
  } catch (error) {
    console.error("Select Post Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const editSelectPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    // add post validation here
    const { title, content, isPublished } = req.body;

    // get userId from jwt to pass as author
    const userId = Number(req.user.id);

    const editedPost = await editPostById(postId, title, content, isPublished);
    return res.status(200).json({ editedPost });
  } catch (error) {
    console.error("Edit Post Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const deleteSelectPost = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    await deletePostById(postId);
    return res.status(204).json({ msg: "post successfully deleted" });
  } catch (error) {
    console.error("Delete Post Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
