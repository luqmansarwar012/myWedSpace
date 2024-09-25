import express from "express";
import { registerHall } from "../controllers/hallController.js";
import ownerAuth from "../middlewares/ownerAuth.js";

const hallRouter = express.Router();

// register hall
hallRouter.post("/register", ownerAuth, registerHall);

export default hallRouter;
