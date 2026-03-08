import Job from "../models/jobModel.js";

// create job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all jobs
export const getAllJobs = async (req, res) => {
  try {

    const { jobType, salaryType } = req.query;

    let filter = {};

    if (jobType) {
      filter.jobType = jobType;
    }

    if (salaryType) {
      filter.salaryType = salaryType;
    }
    
    const jobs = await Job.find(filter);

    const jobsWithCountdown = jobs.map((job) => {

      const now = new Date();
      const deadline = new Date(job.applicationDeadline);

      const diff = deadline - now;

      const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

      return {
        ...job._doc,
        daysLeft: daysLeft
      };

    });

    res.status(200).json(jobsWithCountdown);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};