import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
} from "../controllers/userController";
import asyncHandler from "../utils/asyncHandler";
// import { authenticate } from "../middleware/authenticate";
import bodyParser from "body-parser";
import { UserRole } from "../models/User";
import { checkRole } from "../middleware/checkRole";

const userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.post("/uc/v1/register", asyncHandler(registerUser));
userRouter.post("/uc/v1/login", asyncHandler(loginUser));
userRouter.post("/uc/v1/logout", asyncHandler(logoutUser));
// userRouter.use(authenticate);
// userRouter.get(
//   "/uc/v1/getUser",
//   asyncHandler(checkRole),
//   asyncHandler(getAllUsers)
// );

export default userRouter;
