import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
import asyncHandler from "../utils/asyncHandler";

const userRouter = express.Router();

userRouter.post("/uc/v1/register", asyncHandler(registerUser));
userRouter.post("/uc/v1/login", asyncHandler(loginUser));

export default userRouter;
