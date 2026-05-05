import { Router } from "express";
import {
  allPosts,
  deleteSelectPost,
  editSelectPost,
  newPost,
  selectPost,
} from "../controllers/posts.js";

export const postRouter = Router();

postRouter.get("/", allPosts);
postRouter.post("/", newPost);

postRouter.get("/:postId", selectPost);
postRouter.put("/:postId", editSelectPost);
postRouter.delete("/:postId", deleteSelectPost);
