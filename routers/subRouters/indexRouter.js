import { Router } from "express";
import { getMe } from "../../controllers/index.js";

export const indexRouter = Router();

indexRouter.get("/me/:userId", getMe);
