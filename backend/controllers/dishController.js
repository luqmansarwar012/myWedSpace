import hallModel from "../models/hallModel.js";
import dishModel from "../models/dishModel.js";
import mongoose from "mongoose";

const addDish = async (req, res) => {
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
    res
      .status(500)
      .json({ success: false, message: "Something went wrong in adding dish" });
  }
};
// update dish
const updateDish = async (req, res) => {
  const { name, description, price, dishId } = req.body;
  try {
    // Validate dishId to be a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid dishId.",
      });
    }
    // Create an update object with only the fields that are provided
    const updateFields = {};
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;

    // Update the dish in the dishes table
    const updatedDish = await dishModel.findByIdAndUpdate(
      dishId,
      updateFields,
      { new: true }
    );

    if (!updatedDish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dish updated successfully.",
      data: updatedDish,
    });
  } catch {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong in updating dish",
    });
  }
};
const deleteDish = async (req, res) => {
  const { dishId } = req.params;
  try {
    // Validate dishId to be a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid dishId.",
      });
    }
    // Delete the dish from the dishes table
    const deletedDish = await dishModel.findByIdAndDelete(dishId);
    if (!deletedDish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found.",
      });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Dish deleted successfully." });
    }
  } catch {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong in deleting dish",
    });
  }
};
export { addDish, updateDish, deleteDish };
