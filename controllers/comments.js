import {
  createNewComment,
  deleteCommentById,
  editCommentById,
  getCommentById,
} from "../models/comment.js";
import { getUserById } from "../models/user.js";

export const newComment = async (req, res, next) => {
  try {
    // get post id from params
    const postId = Number(req.params.postId);

    // add validation for message?
    const { message } = req.body;

    // get user Id
    const userId = Number(req.user.id);
    console.log("User id retrived from req.user.id after token check", userId);

    const newComment = await createNewComment(userId, postId, message);
    return res.status(201).json({ newComment });
  } catch (error) {
    console.error("Create New Comment Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const selectComment = async (req, res, next) => {
  try {
    const commentId = Number(req.params.commentId);

    const selectComment = await getCommentById(commentId);
    return res.status(200).json({ selectComment });
  } catch (error) {
    console.error("Select Comment Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const editSelectComment = async (req, res, next) => {
  const userId = Number(req.user.id);
  // console.log("User id after auth token verification", userId);
  try {
    const user = await getUserById(userId);

    if (user) {
      console.log("user obj when editing comment", user);

      if (user.admin) {
        // comment id to edit
        const commentId = Number(req.params.commentId);

        // add comment validation here
        const { message } = req.body;

        const editedComment = await editCommentById(commentId, message);
        return res.status(200).json({ editedComment });
      } else {
        return res.status(403).end();
      }
    } else {
      return res.status(404).json({ msg: "user not found!" });
    }
  } catch (error) {
    console.error("Edit Comment Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const deleteSelectComment = async (req, res, next) => {
  const userId = Number(req.user.id);
  try {
    const user = await getUserById(userId);
    if (user) {
      if (user.admin) {
        const commentId = Number(req.params.commentId);
        await deleteCommentById(commentId);
        return res.status(204).json({ msg: "comment successfully deleted" });
      } else {
        return res.status(403).end();
      }
    } else {
      return res.status(404).json({ msg: "user not found!" });
    }
  } catch (error) {
    console.error("Delete Comment Error", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
