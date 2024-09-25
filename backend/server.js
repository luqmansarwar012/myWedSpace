import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import dishRouter from "./routes/dishRoute.js";
import dotenv from "dotenv";
import hallRouter from "./routes/hallRoute.js";
dotenv.config();
// App config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
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

//Owner endpoints
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/hall/", hallRouter);
app.use("/api/v1/dish/", dishRouter);

// Running express server
app.listen(port, () => {
  console.log(`Server runing on : http://localhost:${port}`);
});
