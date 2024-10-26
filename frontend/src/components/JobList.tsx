import { useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

interface Jobs {
  id: string;
  status: string;
  result: string;
}
gsap.registerPlugin(useGSAP, TextPlugin);

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState<string | null>(null);


  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/jobs");
      setJobs(response.data);
    } catch (err:any) {
      console.error("Error fetching jobs:", err);
      setError(err.message);
    }
  };

useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);



 
  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>; // Show error message in red
  }
  return (
    <div >
      <h3  className=" text-center sm:text md:text-3xl pb-6 uppercase text-white " >
        JOBS LIST
      </h3>
      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"  >
        {jobs.map((job: Jobs, index) => (

<div key={index} className="relative w-full aspect-w-1 aspect-h-1 sm:aspect-w-3 sm:aspect-h-4 overflow-hidden rounded-lg">
{job.status === "pending" ? (
  <div className="absolute w-full  inset-0 bg-gray-200 animate-pulse rounded-lg" />
) : (
  <Image
    src={job.result}
    alt="Job Result"
    width={100}
                    height={300}
                    style={{
                      width:'20vh',
                     height:'20vh',
                     objectFit: 'cover', 
                     borderRadius:"10px",}}
    className="rounded-lg"
    placeholder="blur"
    blurDataURL="/placeholder.png" // Local low-res image
  />
)}
</div>

        
        ))}
      </div>
    </div>
  );
}
