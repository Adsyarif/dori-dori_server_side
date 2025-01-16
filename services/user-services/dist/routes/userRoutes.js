"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.post("/api/register", userController_1.registerUser);
// userRouter.post("/api/login", asyncHandler(loginUser));
// userRouter.post("/api/logout", asyncHandler(logoutUser));
// userRouter.use(authenticate);
// userRouter.get(
//   "/uc/v1/getUser",
//   asyncHandler(checkRole),
//   asyncHandler(getAllUsers)
// );
exports.default = userRouter;
