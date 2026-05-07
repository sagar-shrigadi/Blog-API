import "dotenv/config";
import express from "express";
import cors from "cors";
import { indexRouter } from "./routers/indexRouter.js";
import { postRouter } from "./routers/postRouter.js";
import { commentRouter } from "./routers/commentRouter.js";
import { authRouter } from "./routers/authRouter.js";
import { authenticateToken } from "./controllers/auth.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// public routes for login/sign-up
app.use("/", authRouter);

app.use(authenticateToken);

// private routes
// only accessible if token verification is successful
app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app sucessfully running on port ${PORT}`);
});
