import { Router } from "express";
import adminMiddleware from "../middlewares/admin.middlewares.js";
import admindashController from "../controllers/admindash.controllers.js";

const admindashRouter = Router();

admindashRouter.post("/admin/dashboard", adminMiddleware, admindashController);

export default admindashRouter;
