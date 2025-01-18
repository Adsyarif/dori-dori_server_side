import express, { Application } from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/connection";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import { Request, Response } from "express";
import "./config/passport";

dotenv.config({ path: "./config.env" });

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/v1/auth", authRoutes);
app.use("/v1/users", userRoutes);
app.get("/", (_: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use(errorHandler);

export default app;
