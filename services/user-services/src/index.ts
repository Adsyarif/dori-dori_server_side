import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import userRouter from "./routes/userRoutes";
import connectDB from "./database/connection";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("v1/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
