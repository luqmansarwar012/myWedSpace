import express from "express";
import { registerHall, addDishToHall } from "../controllers/hallController.js";
import ownerAuth from "../middlewares/ownerAuth.js";

const hallRouter = express.Router();

// register hall
hallRouter.post("/register-hall", ownerAuth, registerHall);
// add a dish to hall
hallRouter.post("/add-dish-to-hall/:hallId", ownerAuth, addDishToHall);

export default hallRouter;
