import { User } from "../models/user.model.js";

const admindashController = async (req, res) => {
  const { _id, email } = req.admin ?? {};
  const response = await User.findOne({ _id, email }).select("-password");

  if (!response) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "successful", user: response });
};

export default admindashController;
