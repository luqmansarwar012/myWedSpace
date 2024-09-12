import ownerModel from "../models/ownerModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

const createJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const signup = async (req, res) => {
  // signup logic
  const { name, email, password } = req.body;
  try {
    const exists = await ownerModel.findOne({ email });
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
    // checking if user with same email already exists
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }

    // hashing user passwor
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new ownerModel({
      name,
      email,
      password: hashedPass,
    });

    const createdOwner = await user.save();
    // creating jwt token
    const token = createJwtToken(createdOwner._id);
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
    const owner = await ownerModel.findOne({ email });
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "owner doesn't exists!" });
    }
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }
    // creating jwt token
    const token = createJwtToken(owner._id);
    res
      .status(200)
      .json({ success: true, message: "Logged in!", token, role: owner.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
export { signup, login };
