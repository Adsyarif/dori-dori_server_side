// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User";

// export const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ message: "Authentication failed" });
//   }

//   try {
//     // Verifikasi token dan ambil payload
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//     // Cari user berdasarkan ID dari payload token
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     // Menambahkan user ke dalam req untuk digunakan pada route selanjutnya
//     req.user = user;

//     next();
//   } catch (error) {
//     const errMessage =
//       error instanceof Error ? error.message : "Unknown error occurred";
//     return res
//       .status(401)
//       .json({ message: "Authentication failed", error: errMessage });
//   }
// };
