import express from "express";
import { getAllUsers } from "../controllers/userController";

const userRouter = express.Router();

// userRouter.post("/api/register", registerUser);
// userRouter.post("/api/login", loginUser);
// userRouter.get("/");

export default userRouter;
