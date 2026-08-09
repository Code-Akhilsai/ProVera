import { Router } from "express";
import userMiddleware from "../middlewares/user.middlewares.js";
import profileController from "../controllers/profile.controllers.js";
import { User } from "../models/user.model.js";

const profileRouter = Router();

profileRouter.post("/profile", userMiddleware, profileController);
profileRouter.get("/fetch/user", userMiddleware, async (req, res) => {
  const { _id, email } = req.user;

  const user = await User.findOne({ _id, email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const fullname = user.full_name;
  const user_email = user.email;

  return res.status(200).json({ message: "user found" }, fullname, user_email);
});

export default profileRouter;
