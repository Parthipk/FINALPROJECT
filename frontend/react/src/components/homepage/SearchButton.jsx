import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function SearchButton({ onSearch }) {
  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  // Retrieve cookie values on component mount
  useEffect(() => {
    const savedJob = Cookies.get('job');
    const savedLocation = Cookies.get('location');
    const savedCategory = Cookies.get('category');
    
    console.log('Retrieved cookies on mount:', {
      job: savedJob,
      location: savedLocation,
      category: savedCategory,
    });

    if (savedJob) setJob(savedJob);
    if (savedLocation) setLocation(savedLocation);
    if (savedCategory) setCategory(savedCategory);

    // Add event listener for "Enter" key press
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
        window.scrollBy({
          top: 50,
          left: 0,
          behavior: 'smooth', 
        }); 
      }
    };

    // Attach the keydown event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Save values to cookies whenever they change
  const handleSearch = () => {
    // Store values in cookies
    Cookies.set('job', job, { expires: 7 }); // Store for 7 days
    Cookies.set('location', location, { expires: 7 });
    Cookies.set('category', category, { expires: 7 });

    console.log('Stored cookies:', {
      job: job,
      location: location,
      category: category,
    });

    // Pass the selected filters to the parent component
    onSearch({ job, location, category });

    // Scroll the page smoothly 500px downwards
    window.scrollBy({
      top: 500,
      left: 0,
      behavior: 'smooth', // Add smooth scrolling
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white bg-opacity-20 p-6 rounded-[30px] shadow-lg flex items-center space-x-4 w-full max-w-5xl">
        <div className="flex-1">
          <input
            type="text"
            id="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Enter Job Title"
            className="w-full p-3 mt-2 border border-gray-300 rounded-[30px]"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            className="w-full p-3 mt-2 border border-gray-300 rounded-[30px]"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category (e.g., Full Time, Part Time)"
            className="w-full p-3 mt-2 border border-gray-300 rounded-[30px]"
          />
        </div>

        <div className="flex-none">
          <button
            onClick={handleSearch}
            className="bg-[#309689] text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
