import React from 'react';
import agriculture from '../../assets/home/Card.png';
import metal from '../../assets/home/Card (1).png';
import commerce from '../../assets/home/Card (2).png';
import construction from '../../assets/home/Card (3).png';
import hotel from '../../assets/home/Card (4).png';
import education from '../../assets/home/Card (5).png';
import finance from '../../assets/home/Card (6).png';
import transport from '../../assets/home/Card (7).png';
import Cookies from 'js-cookie';
import { Heading } from './data';

export default function Browse() {
  // Function to handle button click and store category data in cookies
  const handleCategoryClick = (category) => {
    // Save the category to cookies
    Cookies.set('category', category, { expires: 7 }); // Cookies expire after 7 days
    console.log(`Category ${category} saved in cookies!`);
  };

  return (
    <>
      <h1 className="text-center text-5xl text-gray-900 font-pj font-bold my-20">
        {Heading[1].title}
      </h1>

      <div className="bg-[#b0ebe3]">
        <div className="min-h-screen flex items-center justify-center">
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => handleCategoryClick('Agriculture')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={agriculture}
                alt="Agriculture"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Metal')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={metal}
                alt="Metal"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Commerce')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={commerce}
                alt="Commerce"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Construction')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={construction}
                alt="Construction"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Hotel')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={hotel}
                alt="Hotel"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Education')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={education}
                alt="Education"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Finance')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={finance}
                alt="Finance"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Transport')}
              className="text-center transform hover:scale-105 transition-all"
            >
              <img
                src={transport}
                alt="Transport"
                className="w-80 h-72 mb-2 object-contain rounded-lg hover:shadow-xl"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
