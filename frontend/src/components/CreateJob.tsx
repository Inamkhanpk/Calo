import axios from 'axios';
import { useState } from 'react';

export default function CreateJob({ onJobCreated }:any) {
  const [loading, setLoading] = useState(false);

  const createJob = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/jobs');
      onJobCreated(response.data.jobId);
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500  rounded-full p-2" onClick={createJob} disabled={loading}>
        {loading ? 'Creating...' : 'Create Job'}
      </button>
    </div>
  );
}