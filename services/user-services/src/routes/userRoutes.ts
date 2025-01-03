import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
} from "../controllers/userController";
import asyncHandler from "../utils/asyncHandler";

const userRouter = express.Router();

userRouter.post("/uc/v1/register", asyncHandler(registerUser));
userRouter.post("/uc/v1/login", asyncHandler(loginUser));
userRouter.post("/uc/v1/logout", asyncHandler(logoutUser));
userRouter.get("/uc/v1/getUser", asyncHandler(getAllUsers));

export default userRouter;
