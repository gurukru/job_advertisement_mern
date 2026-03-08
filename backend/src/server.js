import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/", jobRoutes);

// test route
app.get("/", (req, res) => {
  res.status(200).send("Job Advertisement Backend running");
});

const PORT = process.env.PORT || 5555;

// connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});
