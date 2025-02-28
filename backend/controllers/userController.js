import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import validator from "validator";
import "dotenv/config.js";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.josn({ success: false, message: "User not exist" });
    }
    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credientals" });
    }
    const token =createToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email } = await req.body;
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    //validate
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong  password",
      });
    }
    //hashing user password
    const salt = await bycript.genSalt(10);
    const hashedPassword = await bycript.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
