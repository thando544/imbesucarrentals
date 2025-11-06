import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = 5000;
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);

app.get("/api/ping", (req, res) =>
  res.json({
    ok: true,
    time: Date.now(),
  })
);

app.get("/", (req, res) => {
  res.send("IMBESU CAR RENTAL API WORKING");
});

app.listen(PORT, () => {
  console.log(`server runnimg on http://localhost:${PORT}`);
});
