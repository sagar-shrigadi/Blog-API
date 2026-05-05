import "dotenv/config";
import express from "express";
import { indexRouter } from "./routers/indexRouter.js";
import { postRouter } from "./routers/postRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/posts", postRouter);
app.use("/", indexRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app sucessfully running on port ${PORT}`);
});
