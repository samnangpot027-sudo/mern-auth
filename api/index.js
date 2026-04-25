import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { error } from "node:console";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongo connecting");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
