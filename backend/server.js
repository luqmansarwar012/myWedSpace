import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
// App config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);
// Database connection
connectDB();

// API endpoints
app.get("/", (req, res) => {
  res.json("Hello");
});

// Running express server
app.listen(port, () => {
  console.log(`Server runing on : http://localhost:${port}`);
});
