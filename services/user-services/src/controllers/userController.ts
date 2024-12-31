import { Request, Response } from "express";
import { User, IUser, UserRole } from "../models/User";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password, phone, address, role } = req.body;

  try {
    // Check if role is valid
    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return res
      .status(500)
      .json({ message: "Error registering user", error: errMessage });
  }
};

// Login a user
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return res
      .status(500)
      .json({ message: "Error logging in", error: errMessage });
  }
};

// Get all users (for admin only)
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Pastikan req.user ada dan memiliki role
    if (!req.user || req.user.role !== UserRole.Admin) {
      return res.status(403).json({ message: "Forbidden access" });
    }

    const users = await User.find();
    return res.status(200).json(users);
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return res
      .status(500)
      .json({ message: "Error fetching users", error: errMessage });
  }
};
