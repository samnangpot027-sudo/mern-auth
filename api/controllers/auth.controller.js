import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "create successfully " });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const valiPass = bcrypt.compareSync(password, validUser.password);
    if (!valiPass) return next(errorHandler(401, "Wrong password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // create token
    const { password: hashedPassword, ...rest } = validUser._doc; // make password to the resting
    const expiryDate = new Date(Date.now() + 3600000); // 1h for token
    res
      .cookie("acces_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
