import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function JobDetails() {
  const { id } = useParams(); // Get the jobId from the URL params
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.post('http://localhost:3000/recruiter/getJob', { jobId: id });
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("There was an error fetching the job details. Please try again later.");
      }
    };

    fetchJobDetails();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!job) {
    return <p className="text-gray-500">Loading job details...</p>;
  }

  return (
    <div className="p-6 mt-10">
      <h2 className="text-2xl font-semibold">{job.jobTitle}</h2>
      <p className="text-gray-600 mt-4">{job.jobDescription}</p>
      <div className="mt-4 text-[#309689] text-sm">
        <p><strong>Work Model:</strong> {job.workModel}</p>
        <p><strong>Hours:</strong> {job.hours}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Location:</strong> {job.companyLocation}</p>
      </div>
      <div className="mt-4">
        <p><strong className="text-gray-700">Contact:</strong> {job.email}</p>
        <p><strong className="text-gray-700">Company:</strong> {job.companyName}</p>
      </div>
    </div>
  );
}
