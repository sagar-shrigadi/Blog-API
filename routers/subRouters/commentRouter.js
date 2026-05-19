import { Router } from "express";
import {
  deleteSelectComment,
  editSelectComment,
} from "../../controllers/comments.js";

export const commentRouter = Router({ mergeParams: true });

// edit and delete comment
commentRouter.put("/:commentId", editSelectComment);
commentRouter.delete("/:commentId", deleteSelectComment);
