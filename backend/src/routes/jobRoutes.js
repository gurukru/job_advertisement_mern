import express from "express";
import { createJob, getAllJobs, updateJob, deleteJob } from "../controllers/jobController.js";
const router = express.Router();

router.post("/jobs", createJob);
router.get("/jobs", getAllJobs);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

export default router;
