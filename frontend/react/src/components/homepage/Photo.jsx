import React from 'react';
import image from '../../assets/home/photo.jpg'
export default function Photo() {
  return (
    <div className="flex justify-center items-center relative">
     <div className="relative w-[90%] h-[350px] rounded-2xl">
  <img src={image} alt="Placeholder" className="w-full h-full object-cover rounded-2xl" />
  <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div> {/* Transparent overlay */}
</div>

      <div className="absolute bottom-28 left-48 ">
        <h1 className="text-4xl font-bold text-white">Find Your Dream Job</h1>
        <p className="text-lg text-white mt-2">Explore exciting opportunities and kickstart your career</p>
      </div>
      <button 
        className="absolute bottom-5 left-64 transform -translate-x-1/2 px-5 py-2 bg-[#309689] text-white border-none rounded-md text-lg cursor-pointer shadow-md transition-colors duration-300 ease-in-out "
      >
        Search Jobs
      </button>
    </div>
  );
}
