import express from "express";
import { signup, login, registerHall } from "../controllers/userController.js";
import fetchUser from "../middlewares/fetchUser.js";
import ownerAuth from "../middlewares/ownerAuth.js";

const userRouter = express.Router();

// user signup
userRouter.post("/signup", signup);
// user login
userRouter.post("/login", login);
// register hall
userRouter.post("/register-hall", ownerAuth, registerHall);

export default userRouter;
