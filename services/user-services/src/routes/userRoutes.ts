import express from "express";
import {
  registerUser,
  loginUser,
  // logoutUser,
  getAllUsers,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/api/register", registerUser);
userRouter.post("/api/login", loginUser);

export default userRouter;
