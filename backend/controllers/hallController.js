import hallModel from "../models/hallModel.js";
import dishModel from "../models/dishModel.js";
import mongoose from "mongoose";

const registerHall = async (req, res) => {
  const name = req.body.name.toLowerCase();
  const location = req.body.location.toLowerCase();
  const capacity = req.body.capacity;
  const ownerId = req.user.id;

  try {
    // Validate required fields
    if (!name || !location || !capacity || !ownerId) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, location,owner id and capacity.",
      });
    }

    // Validate capacity to be a positive number
    if (capacity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Capacity must be a positive number.",
      });
    }

    // Check if a hall with the same name and location already exists
    const exists = await hallModel.findOne({ name, location });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Hall already exists at this location!",
      });
    }

    // Create new hall
    const hall = new hallModel({
      name,
      location,
      capacity,
      ownerId,
    });

    const createdHall = await hall.save();
    res.status(200).json({
      success: true,
      message: "Hall registered successfully!",
      hall: createdHall,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
const addDishToHall = async (req, res) => {
  const { name, description, price, hallId } = req.body;
  try {
    // Validate required fields
    if (!name || !price || !hallId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, price, and hallId.",
      });
    }

    // Validate hallId to be a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(hallId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hallId.",
      });
    }

    // Check if the dish already exists in the dishes table with the same hallId
    const existingDish = await dishModel.findOne({ name, hallId });
    if (existingDish) {
      return res.status(400).json({
        success: false,
        message: "Dish with the same name already exists in this hall.",
      });
    }

    // Add the new dish to the dishes table
    const newDish = new dishModel({ name, description, price, hallId });
    await newDish.save();

    res.status(201).json({
      success: true,
      message: "Dish added successfully.",
      data: newDish,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export { registerHall, addDishToHall };
