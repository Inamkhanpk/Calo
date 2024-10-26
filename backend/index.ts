import express from "express";
import cors from "cors";
import jobsRouter from "./routes/jobs";

const app = express();
const PORT = 3001;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow specific origin (Frontend URL)
  methods: "GET,POST", // Allow specific HTTP methods
  optionsSuccessStatus: 200, // For older browsers support
};

// Apply CORS Middleware
app.use(cors(corsOptions)); 

app.use(express.json());

app.use("/jobs", jobsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
