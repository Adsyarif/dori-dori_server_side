"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const User_1 = require("../models/User");
// Get all users (for admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res
            .status(500)
            .json({ message: "Error fetching users", error: errMessage });
    }
};
exports.getAllUsers = getAllUsers;
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
