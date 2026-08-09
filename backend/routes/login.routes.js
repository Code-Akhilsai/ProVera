import { Router } from "express";
import loginController from "../controllers/login.controllers.js";

const loginRouter = Router();

loginRouter.post("/login", loginController);

export default loginRouter;
