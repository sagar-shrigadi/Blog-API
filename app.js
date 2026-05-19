import "dotenv/config";
import express from "express";
import cors from "cors";
import { apiRouter } from "./routers/apiRouter.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app sucessfully running on port ${PORT}`);
});
