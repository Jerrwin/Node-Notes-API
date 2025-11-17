import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import route from "./routes/noteRoute.js";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(express.json());

// routes MUST be added BEFORE app.listen
app.use("/notes", route);

// now start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
