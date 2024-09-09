import mongoose from "mongoose";
const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  hallId: { type: Schema.Types.ObjectId, ref: "Hall", required: true },
});

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
