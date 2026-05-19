import { Router } from "express";
import { authRouter } from "./subRouters/authRouter.js";
import { publicPostRouter } from "./subRouters/publicPostRouter.js";
import { publicCommentRouter } from "./subRouters/publicCommentRouter.js";
import { authenticateToken } from "../controllers/auth.js";
import { commentRouter } from "./subRouters/commentRouter.js";
import { postRouter } from "./subRouters/postRouter.js";
import { indexRouter } from "./subRouters/indexRouter.js";

export const apiRouter = Router();

// public routes for login/sign-up
apiRouter.use("/", authRouter);
// public /posts and /comments route
// that lets users see posts even without loggin in
apiRouter.use("/posts", publicPostRouter);
apiRouter.use("/comments", publicCommentRouter);

// authenticate incoming token
// and apiRouterend the payload to req.user
// to later retrive in private routes
// for user specific actions that requires user to be logged in
apiRouter.use(authenticateToken);

// private routes
// only accessible if token verification is successful
apiRouter.use("/comments", commentRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/", indexRouter);
