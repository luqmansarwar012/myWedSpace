import express from "express";
import { signup, login } from "../controllers/ownerController.js";

const ownerRouter = express.Router();

// owner signup
ownerRouter.post("/signup", signup);
// owner login
ownerRouter.post("/login", login);

export default ownerRouter;
