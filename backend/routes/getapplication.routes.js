import { Router } from "express";
import getapplicationController from "../controllers/getapplication.controllers.js";
const getapplicationRouter = Router();

getapplicationRouter.get("/fetch/applications", getapplicationController);

export default getapplicationRouter;
