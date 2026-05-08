import { Router } from "express";
import {
  deleteSelectPost,
  editSelectPost,
  newPost,
} from "../controllers/posts.js";
import { newComment } from "../controllers/comments.js";

export const postRouter = Router();

// new post
postRouter.post("/", newPost);

// new comment on a post
postRouter.post("/:postId/comments", newComment);

// edit and delete post
postRouter.put("/:postId", editSelectPost);
postRouter.delete("/:postId", deleteSelectPost);
