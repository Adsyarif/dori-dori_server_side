"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, phone, address, role } = req.body;
    try {
        if (!Object.values(User_1.UserRole).includes(role)) {
            res.status(400).json({ message: "Invalid role provided" });
        }
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
        });
        await newUser.save();
        res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res
            .status(500)
            .json({ message: "Error registering user", error: errMessage });
    }
};
exports.registerUser = registerUser;
// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
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
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: "Error logging in", error: errMessage });
    }
};
exports.loginUser = loginUser;
// Get all users (for admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return res
            .status(500)
            .json({ message: "Error fetching users", error: errMessage });
    }
};
exports.getAllUsers = getAllUsers;
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("authToken");
        return res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return res
            .status(500)
            .json({ message: "Error logging out user", error: errMessage });
    }
};
exports.logoutUser = logoutUser;
