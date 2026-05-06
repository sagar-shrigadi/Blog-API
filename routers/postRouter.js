import { Router } from "express";
import {
  allPosts,
  deleteSelectPost,
  editSelectPost,
  newPost,
  selectPost,
} from "../controllers/posts.js";
import { newComment } from "../controllers/comments.js";

export const postRouter = Router();

postRouter.get("/", allPosts);
postRouter.post("/", newPost);

postRouter.post("/:postId/comments", newComment);

postRouter.get("/:postId", selectPost);
postRouter.put("/:postId", editSelectPost);
postRouter.delete("/:postId", deleteSelectPost);
