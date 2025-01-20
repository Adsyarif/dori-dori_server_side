import { User, IUser, UserRole } from "../models/User";
import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import passport from "passport";

// Register a new user
export const registerUser: RequestHandler = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  console.log("User registration initiated");

  try {
    if (!name || !email || !password || !phone || !address || !role) {
      res.status(412).json({ status: 412, message: "All fields are required" });
      return;
    }

    if (!Object.values(UserRole).includes(role)) {
      res.status(412).json({ status: 412, message: "Invalid role provided" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(412).json({ status: 412, message: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: { id: newUser.id, name, email, phone, address, role },
    });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("Error registering user:", errMessage);

    res.status(500).json({
      message: "Error registering user",
      error: errMessage,
    });
  }
};

// Login a user
export const loginUser: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "local",
    (err: any, user: IUser, info: { message: any }) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: info?.message || "Authentication failed",
        });
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.status(200).json({
          status: 200,
          message: "Login successful",
          data: { id: user.id, name: user.name, email: user.email },
        });
      });
    }
  )(req, res, next);
};

export const loginWithGoogle: RequestHandler = (req, res) => {
  passport.authenticate("google", {
    scope: ["profile", "emaill"],
  })(req, res);
};
