import { User } from "../models/user.model.js";

const profileController = async (req, res) => {
  const { _id, email } = req.user ?? {};
  const response = await User.findOne({ _id, email }).select("-password");

  if (!response) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "successful", user: response });
};

export default profileController;
