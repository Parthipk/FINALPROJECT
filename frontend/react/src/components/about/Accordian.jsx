import React, { useState } from 'react';
import { accordionData } from './data'; // Import the accordion data

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null); // Track which section is active

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };
    return (
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-center text-5xl font-pj font-bold mt-20  ">Frequently Asked Questions</h1>
      <h1 className="text-center text-xl font-pj font-bold my-10  ">get to know more about us </h1>
      <div className="space-y-4">
        {accordionData.map((item, index) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md">
            <button
              className="flex items-center justify-between w-full p-4 text-left bg-gray-100 rounded-t-lg"
              onClick={() => toggleAccordion(index)} // Use dynamic index for toggling
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#309689] text-white rounded-full">
                  {item.id} {/* Display the index number inside a circle */}
                </div>
                <span className="font-semibold">{item.title}</span>
              </div>
              <span className="text-xl">{activeIndex === index ? '-' : '+'}</span> {/* Toggle + / - */}
            </button>
            {activeIndex === index && (
              <div className="p-4">
                <p>{item.content}</p> {/* Display content dynamically */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
