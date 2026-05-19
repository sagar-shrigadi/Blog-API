import { Router } from "express";
import { selectComment } from "../../controllers/comments.js";

export const publicCommentRouter = Router({ mergeParams: true });

// get a selected comment
publicCommentRouter.get("/:commentId", selectComment);
