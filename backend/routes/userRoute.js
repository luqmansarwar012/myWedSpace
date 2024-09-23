import express from "express";
import { signup, login } from "../controllers/userController.js";

const userRouter = express.Router();

// owner signup
userRouter.post("/signup", signup);
// owner login
userRouter.post("/login", login);

export default userRouter;
