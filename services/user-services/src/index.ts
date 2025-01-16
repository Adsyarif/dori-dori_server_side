import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import userRouter from "./routes/userRoutes";
import connectDB from "./database/connection";
import bodyParser, { json } from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(json());
userRouter.use(bodyParser.urlencoded({ extended: true }));
app.use("v1/user", userRouter);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
