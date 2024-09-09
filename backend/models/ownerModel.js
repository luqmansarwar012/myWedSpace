import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "owner" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hallIds: [{ type: Schema.Types.ObjectId, ref: "Hall" }],
  },
  { minimize: false }
);

const ownerModel = mongoose.model("Owner", ownerSchema);

export default ownerModel;
