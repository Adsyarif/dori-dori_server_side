"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
// import { authenticate } from "../middleware/authenticate";
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter = express_1.default.Router();
userRouter.use(body_parser_1.default.urlencoded({ extended: true }));
userRouter.post("/uc/v1/register", (0, asyncHandler_1.default)(userController_1.registerUser));
userRouter.post("/uc/v1/login", (0, asyncHandler_1.default)(userController_1.loginUser));
userRouter.post("/uc/v1/logout", (0, asyncHandler_1.default)(userController_1.logoutUser));
// userRouter.use(authenticate);
// userRouter.get(
//   "/uc/v1/getUser",
//   asyncHandler(checkRole),
//   asyncHandler(getAllUsers)
// );
exports.default = userRouter;
