import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(409).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const new_user = await User.create({
      full_name,
      email,
      password: hashPassword,
    });

    //token

    const token = jwt.sign(
      { _id: new_user._id, email: new_user.email },
      process.env.JWT_SECREATE_KEY,
      { expiresIn: "1d" },
    );

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "User failed to register" });
  }
};

export default userController;
