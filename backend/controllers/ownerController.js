import ownerModel from "../models/ownerModel";
import jwt from "jsonwebtoken";

const createJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const signup = async (req, res) => {
  // signup logic
  const { name, email, password } = req.body;
  try {
    const exists = await ownerModel.findOne({ email });
    // checking if user with same email already exists
    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password!",
      });
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
    res.json({ success: true, message: "Account created!", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};
export { signup };
