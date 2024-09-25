import express from "express";
import { signup, login } from "../controllers/userController.js";

const userRouter = express.Router();

// user signup
userRouter.post("/signup", signup);
// user login
userRouter.post("/login", login);

export default userRouter;
