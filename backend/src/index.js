import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../db/connectDB.js";
import userRouter from "../routes/user.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
const clientOrigin = process.env.CLIENT_URL ?? "http://localhost:5173";

app.use(express.json());
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);

app.get("/", (req, res) => console.log("home route"));

await connectDB();

//routes

app.use("/api/v1", userRouter);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
