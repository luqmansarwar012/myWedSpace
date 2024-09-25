import mongoose from "mongoose";
const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },
});

const dishModel = mongoose.model("Dish", dishSchema);

export default dishModel;
