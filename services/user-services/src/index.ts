import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import userRouter from "./routes/userRoutes";
import connectDB from "./database/connection";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(morgan("tiny"));
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
