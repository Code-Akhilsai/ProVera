import { Router } from "express";
import {
  approveApplication,
  rejectApplication,
} from "../controllers/admin.controllers.js";
// Import your admin authentication middleware here if you use one
// import { verifyAdmin } from "../middlewares/admin.middleware.js";

const adminRouter = Router();

// If you have admin auth middleware, add it as the second argument: adminRouter.post("/applications/:id/approve", verifyAdmin, approveApplication);
adminRouter.post("/applications/:id/approve", approveApplication);
adminRouter.post("/applications/:id/reject", rejectApplication);

export default adminRouter;
