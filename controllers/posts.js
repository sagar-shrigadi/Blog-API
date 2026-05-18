import { prisma } from "../lib/prisma.js";
import {
  createNewPost,
  deletePostById,
  editPostById,
  editPostPublishStatusById,
  getAllPost,
  getPostById,
} from "../models/post.js";
import { getUserById } from "../models/user.js";

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
  const userId = Number(req.user.id);
  try {
    const user = await getUserById(userId);

    if (user) {
      if (user.admin) {
        // add content validation here
        const { title, content, isPublished } = req.body;
        console.log("User Id From Req.User.Id after token auth", userId);
        const newPost = await createNewPost(
          userId,
          title,
          content,
          isPublished,
        );
        return res.status(201).json({ newPost });
      } else {
        return res.status(403).end();
      }
    } else {
      return res.status(404).json({ msg: "user not found" });
    }
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
  const userId = Number(req.user.id);
  try {
    const user = await getUserById(userId);

    if (user) {
      if (user.admin) {
        const postId = Number(req.params.postId);
        // add post validation here
        const { title, content, isPublished } = req.body;

        const editedPost = await editPostById(
          postId,
          title,
          content,
          isPublished,
        );
        return res.status(200).json({ editedPost });
      } else {
        return res.status(403).end();
      }
    } else {
      return res.status(404).json({ msg: "user not found!" });
    }
  } catch (error) {
    console.error("Edit Post Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const editSelectPostPublishStatus = async (req, res, next) => {
  const userId = Number(req.user.id);

  try {
    const user = await getUserById(userId);
    if (user) {
      if (user.admin) {
        const postId = Number(req.params.postId);
        const { newStatus } = req.body;
        console.log("new status", newStatus);

        const editedPublishStatusPost = await editPostPublishStatusById(
          postId,
          newStatus,
        );
        console.log("post after updating status", editedPublishStatusPost);

        return res.json({ editedPublishStatusPost });
      } else {
        return res.status(403).end();
      }
    } else {
      return res.status(404).json({ msg: "user not found!" });
    }
  } catch (error) {
    console.error("Edit Post Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const deleteSelectPost = async (req, res, next) => {
  const userId = Number(req.user.id);
  try {
    const user = await getUserById(userId);

    if (user) {
      if (user.admin) {
        const postId = Number(req.params.postId);
        await deletePostById(postId);
        return res.status(204).end();
      } else {
        return res.status(403).end();
      }
    } else {
      return res.status(404).json({ msg: "user not found!" });
    }
  } catch (error) {
    console.error("Delete Post Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
