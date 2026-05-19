import { Router } from "express";
import { postLogin, postSignup } from "../../controllers/auth.js";

export const authRouter = Router();

authRouter.post("/login", postLogin);
authRouter.post("/sign-up", postSignup);
