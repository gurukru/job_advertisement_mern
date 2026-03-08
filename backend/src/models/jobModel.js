import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Internship", "Full-time", "Part-time"],
      required: true,
    },
    salaryType: {
      type: String,
      enum: ["Paid", "Unpaid"],
      required: true,
    },
    salaryPackage: {
      type: String,
      required: true,
    },
    portalLink: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
