import express from "express";
import { updateDish, addDish } from "../controllers/dishController.js";
import ownerAuth from "../middlewares/ownerAuth.js";

const dishRouter = express.Router();

// add a dish to hall
dishRouter.post("/add", ownerAuth, addDish);
//  update dish in hall
dishRouter.put("/update", ownerAuth, updateDish);

export default dishRouter;
