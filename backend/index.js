import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is ranning on port ${PORT}!`);
});

app.use("/backend/user", userRouter);
app.use("/backend/auth", authRouter);
