import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../db/connectDB.js";
import userRouter from "../routes/user.routes.js";
import loginRouter from "../routes/login.routes.js";
import profileRouter from "../routes/profile.routes.js";
import applicationRouter from "../routes/application.routes.js";
import logoutRouter from "../routes/logout.routes.js";
import admindashRouter from "../routes/admindash.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
const clientOrigin = process.env.CLIENT_URL ?? "http://localhost:5173";

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

await connectDB();

//routes

app.use("/api/v1", userRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", applicationRouter);
app.use("/api/v1", logoutRouter);
app.use("/api/v1", admindashRouter);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
