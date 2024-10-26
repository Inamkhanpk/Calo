import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import fs from "fs";
import path from "path";

const router = express.Router();
const JOB_FILE_PATH = path.join(__dirname, "../data/jobs.json");
const UNSPLASH_ACCESS_KEY = 'z-6exzHfvk7n0gB3hgtujlQ9rIeGuThz4Vqe7LmzaPU'; 

interface Job {
  id: string;
  status: "pending" | "resolved" | "error";
  result: string | null;
  createdAt: Date;
  updatedAt?: Date;
}

// Helper function to load jobs from the JSON file
const loadJobs = (): Job[] => {
  const data = fs.readFileSync(JOB_FILE_PATH, "utf-8");
  return JSON.parse(data) as Job[];
};

// Helper function to save jobs to the JSON file
const saveJobs = (jobs: Job[]): void => {
  fs.writeFileSync(JOB_FILE_PATH, JSON.stringify(jobs, null, 2));
};

// POST /jobs - Create a new job
router.post("/", (req: Request, res: Response) => {
  const newJob: Job = {
    id: uuidv4(),
    status: "pending",
    result: null,
    createdAt: new Date(),
  };

  const jobs = loadJobs();
  jobs.push(newJob);
  saveJobs(jobs);

  simulateJobResolution(newJob.id);

  res.status(201).json({ jobId: newJob.id });
});

// GET /jobs - Retrieve all jobs
router.get("/", (req: any, res: any) => {
  const jobs = loadJobs();
  if (!jobs) {
    return res.status(404).json({ message: "No Item found" });
  }
  console.log("Jobs",jobs)
  res.status(200).json(jobs);
});

// GET /jobs/:jobId - Retrieve a specific job
router.get("/:jobId", (req: any, res:any) => {
  const { jobId } = req.params;
  const jobs = loadJobs();
  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json(job);
});

// Function to simulate delayed job resolution
const simulateJobResolution = (jobId: string): void => {
 // const delay = Math.floor(Math.random() * (300000 - 5000 + 1)) + 5000; // Random delay between 5 sec to 5 min

  setTimeout(async () => {
    const jobs = loadJobs();
    const job = jobs.find((job) => job.id === jobId);

    if (job && job.status === "pending") {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            query: 'food', // Specify 'food' as the query to get food-related images
            client_id: UNSPLASH_ACCESS_KEY, // Your access key
          },
        });
        console.log("response", response.data.urls);
        job.result = response.data.urls.full;
        job.status = "resolved";
        job.updatedAt = new Date();
        saveJobs(jobs);
      } catch (error) {
        console.error("Error retrieving Unsplash image:", error);
        job.status = "error";
        saveJobs(jobs);
      }
    }
  }, 1000);
};

export default router;
