import mongoose from "mongoose";
import { config } from "dotenv";


config();

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Database connect saccesfully"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  })
  