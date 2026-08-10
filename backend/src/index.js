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
import getapplicationRouter from "../routes/getapplication.routes.js";
import adminRouter from "../routes/admin.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://pro-vera.netlify.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error("CORS policy violation: Origin not allowed"),
          false,
        );
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

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
app.use("/api/v1", getapplicationRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
