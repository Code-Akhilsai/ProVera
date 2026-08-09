import { Router } from "express";
import loginController from "../controllers/login.controllers.js";
import adminloginController from "../controllers/adminlogin.controllers.js";

const loginRouter = Router();

loginRouter.post("/login", loginController);
loginRouter.post("/admin/login", adminloginController);

export default loginRouter;
