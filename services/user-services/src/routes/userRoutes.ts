import express from "express";
import {
  registerUser,
  loginUser,
  // logoutUser,
  getAllUsers,
} from "../controllers/userController";

// import { authenticate } from "../middleware/authenticate";
import bodyParser from "body-parser";
import { UserRole } from "../models/User";
import { checkRole } from "../middleware/checkRole";

const userRouter = express.Router();

userRouter.post("/api/register", registerUser);
// userRouter.post("/api/login", asyncHandler(loginUser));
// userRouter.post("/api/logout", asyncHandler(logoutUser));
// userRouter.use(authenticate);
// userRouter.get(
//   "/uc/v1/getUser",
//   asyncHandler(checkRole),
//   asyncHandler(getAllUsers)
// );

export default userRouter;
