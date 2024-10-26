"use client";
import JobList from "../components/JobList";
import CreateJob from "../components/CreateJob";
import { useState } from "react";
import { useNetwork } from "../hooks/useNetwork";

export default function Home() {
  const [jobCreated, setJobCreated] = useState(null);

  const isOnline = useNetwork();

  return (
    <>
      {isOnline ? (
        <div className="flex flex-col pt-6 items-center ">
          <div className=" font-bold sm:text-lg uppercase pt-6 md:text-6xl text-white">
            JOB MANAGER
          </div>
          <div className="p-6 box">
            {" "}
            <CreateJob onJobCreated={setJobCreated} />
          </div>
          <div>
            <JobList />
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-6 font-bold text-6xl items-center justify-center h-screen text-white">
          Check your Internet Connection
        </div>
      )}
    </>
  );
}
