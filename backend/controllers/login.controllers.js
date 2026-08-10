import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //token

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECREATE_KEY,
      { expiresIn: "1d" },
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default loginController;
