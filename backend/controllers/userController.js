import userModel from "../models/userModel.js";
import hallModel from "../models/hallModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();
import { ROLES } from "../constants.js";

const createJwtToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};
const signup = async (req, res) => {
  // signup logic
  const { name, email, password, role } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email!",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password!",
      });
    }
    // Validate role to ensure it's either 'customer' or 'owner'
    if (!Object.values(ROLES).includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role! Must be 'customer' or 'owner'.",
      });
    }
    // checking if user with same email already exists
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      password: hashedPass,
      role,
    });

    const createdUser = await user.save();
    // creating jwt token
    const token = createJwtToken(createdUser._id);
    res.status(200).json({ success: true, message: "Account created!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// login logic
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user doesn't exists!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }
    // creating jwt token
    const token = createJwtToken(user);
    res.status(200).json({ success: true, message: "Logged in!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const registerHall = async (req, res) => {
  const name = req.body.name.toLowerCase();
  const location = req.body.location.toLowerCase();
  const capacity = req.body.capacity;

  try {
    // Validate required fields
    if (!name || !location || !capacity) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, location, and capacity.",
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

export { signup, login, registerHall };
