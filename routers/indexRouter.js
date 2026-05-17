import { Router } from "express";
import { getIndex, getMe } from "../controllers/index.js";

export const indexRouter = Router();

indexRouter.get("/me/:userId", getMe);
indexRouter.get("/", getIndex);
