"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const connection_1 = __importDefault(require("./database/connection"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, connection_1.default)();
app.use(express_1.default.json());
app.use("v1/user", userRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get("/", (_, res) => {
    res.send("Hello, TypeScript Express!");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
