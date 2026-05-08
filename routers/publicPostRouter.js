import { Router } from "express";
import { allPosts, selectPost } from "../controllers/posts.js";

export const publicPostRouter = Router({ mergeParams: true });

// get all posts and a selected post
publicPostRouter.get("/", allPosts);
publicPostRouter.get("/:postId", selectPost);
