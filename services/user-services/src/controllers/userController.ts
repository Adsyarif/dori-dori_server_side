import { RequestHandler } from "express";
import { User } from "../models/User";

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
