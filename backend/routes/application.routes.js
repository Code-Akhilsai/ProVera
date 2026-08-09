import { Router } from "express";
import multer from "multer";
import userMiddleware from "../middlewares/user.middlewares.js";
import applicationController, {
  getCurrentApplication,
  submitCurrentApplication,
} from "../controllers/application.controllers.js";

const applicationRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

applicationRouter.post(
  "/application",
  userMiddleware,
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  applicationController,
);

applicationRouter.get("/application/me", userMiddleware, getCurrentApplication);

applicationRouter.post(
  "/application/submit",
  userMiddleware,
  submitCurrentApplication,
);

export default applicationRouter;
