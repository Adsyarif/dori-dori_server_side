import express from "express";
import {
  registerUser,
  loginUser,
  loginWithGoogle,
} from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/auth/google", loginWithGoogle);

export default authRoutes;
