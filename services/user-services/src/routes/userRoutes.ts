import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController";
import { checkRole } from "../middleware/checkRole";
import { UserRole } from "../models/User";
import { authenticate } from "../middleware/authenticate";
import asyncHandler from "../utils/asyncHandler";

const router = express.Router();

router.post("/uc/v1/register", asyncHandler(registerUser));
// router.post("/login", asyncHandler(loginUser));
// router.get(
//   "/users",
//   authenticate,
//   checkRole([UserRole.Admin]),
//   asyncHandler(getAllUsers)
// );

export default router;
