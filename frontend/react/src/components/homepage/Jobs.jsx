import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the Cookies library
import { FaBriefcase, FaMapMarkerAlt, FaSuitcase, FaMailBulk } from 'react-icons/fa';
import image from '../../assets/home/rb_802.png';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post('http://localhost:3000/recruiter/get');
        console.log('Fetched Jobs:', response.data); 
        if (Array.isArray(response.data) && response.data.length > 0) {
          setJobs(response.data);
          filterJobs(response.data);
        } else {
          setError('No jobs found.');
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("There was an error fetching jobs. Please try again later.");
      }
    };

    fetchJobs();

    const interval = setInterval(() => {
      fetchJobs();
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  const filterJobs = (jobs) => {
    // Retrieve cookie values
    const jobCookie = Cookies.get('job');
    const locationCookie = Cookies.get('location');
    const categoryCookie = Cookies.get('category');

    const filtered = jobs.filter((job) => {
      let match = true;

      if (jobCookie && job.jobTitle !== jobCookie) {
        match = false;
      }

      if (locationCookie && job.companyLocation !== locationCookie) {
        match = false;
      }

      if (categoryCookie && job.jobCategory !== categoryCookie) {
        match = false;
      }

      return match;
    });

    setFilteredJobs(filtered);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setApplicationStatus(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    setApplicationStatus(null);
  };

  const applyForJob = () => {
    setApplicationStatus('Applied');
  };

  const cancelApplication = () => {
    setApplicationStatus('Cancelled');
  };

  return (
    <div className="p-6 mt-10">
      {error && <p className="text-red-500">{error}</p>}

      {currentJobs.length === 0 ? (
        <p className="text-gray-500">No jobs available</p>
      ) : (
        <ul>
          {currentJobs.map((job) => (
            <li key={job._id} className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                  <p className="text-gray-600 mt-2">{job.jobDescription}</p>

                  <div className="mt-4 flex flex-wrap space-x-5 text-[#309689] text-sm">
                    <div className="flex items-center">
                      <FaBriefcase className="text-lg" />
                      <span className="ml-2">{job.workModel}</span>
                    </div>
                    <div className="flex items-center">
                      <FaSuitcase className="text-lg" />
                      <span className="ml-2">{job.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-lg" />
                      <span className="ml-2">{job.companyLocation}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p><strong className="text-gray-700">Contact:</strong> {job.email}</p>
                    <p><strong className="text-gray-700">Company:</strong> {job.companyName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  {Cookies.get('firstName') ? (
                    <button
                      onClick={() => openModal(job)} 
                      className="bg-[#309689] text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors mt-4"
                    >
                      View Details
                    </button>
                  ) : (
                    <button
                      onClick={() => alert("Please log in to view job details.")}
                      className="bg-[#309689] text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors mt-4"
                    >
                      Login Please
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-10 gap-5">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-[#309689] rounded-full text-white disabled:opacity-50"
          disabled={currentPage === 1}
        >
          {currentPage}
        </button>
        <span className="px-4 py-2 text-lg text-gray-700"></span>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-[#309689] rounded-full text-white disabled:opacity-50"
          disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
        >
          {currentPage + 1}
        </button>
      </div>

      {modalOpen && selectedJob && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 mt-16">
          <div className="bg-white p-6 max-[80%] w-4/5 relative rounded-lg shadow-xl space-y-6 max-h-[80vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4 text-4xl text-gray-600 hover:text-gray-800">&times;</button>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{selectedJob.jobTitle}</h2>
              <img src={image} alt={selectedJob.jobTitle} className="w-[50%] h-[30%] object-cover rounded-lg mb-6" />
              <p className="text-lg text-gray-700 mb-4 ">{selectedJob.jobDescription}</p>
              <div className="text-lg text-gray-600  text-left">
                <p className="flex items-center mb-2"><FaBriefcase className="text-xl text-[#309689] mr-2" /><strong>Work Model : </strong> &nbsp;{selectedJob.workModel}</p>
                <p className="flex items-center mb-2"><FaSuitcase className="text-xl text-[#309689] mr-2" /><strong>Experience Required : </strong> &nbsp;{selectedJob.experience}</p>
                <p className="flex items-center mb-2"><FaMapMarkerAlt className="text-xl text-[#309689] mr-2" /><strong>Location :</strong> &nbsp; {selectedJob.companyLocation}</p>
                <p className="flex items-center mb-4"><FaMailBulk className="text-xl text-[#309689] mr-2" /><strong>Email :</strong> &nbsp; {selectedJob.email}</p>
              </div>

              <div className="text-lg w-[100%]">
                <strong>Job Overview:</strong>
                <p>
                  There is a recruitment for a <span className="font-semibold">{selectedJob.jobTitle}</span> at <span className="font-semibold">{selectedJob.companyName}</span>
                  The position requires <span className="font-semibold">{selectedJob.experience}</span> of experience and offers a <span className="font-semibold">{selectedJob.workModel}</span> work model
                  The job is located in <span className="font-semibold">{selectedJob.companyLocation}</span>
                  For more details about the job, you can contact <span className="font-semibold">{selectedJob.email}</span> or call <span className="font-semibold">{selectedJob.phone}</span>
                  Job responsibilities include: <span className="font-semibold">{selectedJob.jobDescription}</span>.
                </p>
              </div>

              <div className="flex justify-between gap-4 w-full mt-6">
                {applicationStatus === 'Applied' ? (
                  <button onClick={cancelApplication} className="px-6 py-2 bg-red-600 text-white rounded-md">
                    Cancel Application
                  </button>
                ) : (
                  <button onClick={applyForJob} className="px-6 py-2 bg-[#309689] text-white rounded-md">
                    Apply Now
                  </button>
                )}
              </div>

              {applicationStatus && (
                <p className="mt-4 text-center text-lg text-gray-600">
                  You have {applicationStatus} for this job.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
