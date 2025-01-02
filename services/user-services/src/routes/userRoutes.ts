import express from "express";
import { registerUser } from "../controllers/userController";
import asyncHandler from "../utils/asyncHandler";

const userRouter = express.Router();

userRouter.post("/uc/v1/register", asyncHandler(registerUser));

export default userRouter;
