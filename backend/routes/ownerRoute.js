import express from "express";
import { signup } from "../controllers/ownerController.js";

const ownerRouter = express.Router();

// owner signup
ownerRouter.get("/signup", signup);

export default ownerRouter;
