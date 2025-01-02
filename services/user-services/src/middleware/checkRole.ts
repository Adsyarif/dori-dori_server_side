// import { Request, Response, NextFunction } from "express";
// import { UserRole } from "../models/User";

// export const checkRole = (roles: UserRole[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = req.body.user;
//     if (!user || !roles.includes(user.role)) {
//       res.status(403).json({ message: "Access denied" });
//       return;
//     }
//     next();
//   };
// };
