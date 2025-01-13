import React, { useState } from 'react';
import { Heading } from './data';

export default function Details() {
  // State to toggle extra information visibility
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  // Function to toggle the visibility of the extra information
  const handleLearnMoreClick = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  return (
    <div className="container mx-auto my-10 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/021/203/546/original/4k-career-future-animation-new-job-opportunity-or-visionary-to-success-in-work-concept-businessman-riding-office-chair-using-telescope-to-see-future-and-the-way-forward-free-video.jpg"
            alt="Detailed Image"
            className="w-4/5 h-[400px] rounded-lg shadow-md mx-auto"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 mt-24">{Heading[2].title}</h2>
          <p className="text-lg text-gray-700 mt-2 w-[90%]">{Heading[2].des}</p>

          {/* Extra information toggle */}
          {showExtraInfo && (
            <div className="mt-4 text-gray-600 ">
              <p className="text-lg  w-[90%]">
              {Heading[2].extra}
              </p>
            </div>
          )}

          <div className="mt-6">
            <button className="bg-[#309689] text-white py-2 px-6 rounded-lg shadow-md hover:bg-white hover:text-[#309689] focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4">
              Search Jobs
            </button>
            <button className="text-[#309689] underline" onClick={handleLearnMoreClick}>
              {showExtraInfo ? 'Show Less' : 'Learn More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
