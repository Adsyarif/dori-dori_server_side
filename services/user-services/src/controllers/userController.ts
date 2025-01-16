import { User, IUser, UserRole } from "../models/User";
import bcrypt from "bcryptjs";
import { RequestHandler } from "express";

// Register a new user
export const registerUser: RequestHandler = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;
  console.log("user register controller");

  try {
    if (!Object.values(UserRole).includes(role)) {
      res.status(400).json({ message: "Invalid role provided" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error(`Error hashing password: ${err}`);
      } else {
        const newUser: IUser = new User({
          name,
          email,
          password: hash,
          phone,
          address,
          role,
        });
        await newUser.save();
        res
          .status(201)
          .json({ message: "User registered successfully", user: newUser });
      }
    });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res
      .status(500)
      .json({ message: "Error registering user", error: errMessage });
  }
};

// Login a user
export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
      }

      const responseData = {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
      res.status(200).json(responseData);
    }
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message: "Error logging in", error: errMessage });
  }
};

// Get all users (for admin only)
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error fetching users", error: errMessage });
  }
};

// export const logoutUser = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     res.clearCookie("authToken");

//     return res.status(200).json({ message: "User logged out successfully" });
//   } catch (error: unknown) {
//     const errMessage =
//       error instanceof Error ? error.message : "Unknown error occurred";

//     return res
//       .status(500)
//       .json({ message: "Error logging out user", error: errMessage });
//   }
// };
