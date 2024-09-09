import mongoose from "mongoose";
import { HALL_STATUS } from "../constants.js";
const hallSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: Object.values(HALL_STATUS) },
  },
  { minimize: false }
);

const hallModel = mongoose.model("Hall", hallSchema);

export default hallModel;