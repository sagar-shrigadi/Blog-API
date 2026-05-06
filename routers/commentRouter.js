import { Router } from "express";
import {
  deleteSelectComment,
  editSelectComment,
  selectComment,
} from "../controllers/comments.js";

export const commentRouter = Router({ mergeParams: true });

commentRouter.get("/:commentId", selectComment);
commentRouter.put("/:commentId", editSelectComment);
commentRouter.delete("/:commentId", deleteSelectComment);
