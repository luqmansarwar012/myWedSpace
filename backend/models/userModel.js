import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hallIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hall" }],
    orderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { minimize: false }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;