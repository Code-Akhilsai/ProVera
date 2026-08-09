import { Router } from "express";

const logoutRouter = Router();

logoutRouter.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the session cookie
  return res.status(200).json({ message: "Logged out successfully" });
});
export default logoutRouter;
