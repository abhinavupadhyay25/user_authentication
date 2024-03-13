import express from "express";
import dotenv from "dotenv";
import connectDB from "../db/config.js";
import authRoutes from "../routes/authRoutes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());

//routes
app.use("/api", authRoutes);
app.use("/api", authRoutes);

app.listen(3000, async () => {
  try {
    await connectDB();
    console.log("server is running...");
  } catch (error) {
    console.log(error);
  }
});
