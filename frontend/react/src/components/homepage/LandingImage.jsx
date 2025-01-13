import React from 'react';
import landingImage from '../../assets/home/Logo.png'; 
import SearchButton from './SearchButton'; 
import Partners from './Partners';
 import Navebar from './Navebar';
export default function LandingImage() {
  const handleSearch = (filters) => {
    console.log('Filters received:', filters);
    // Perform the search or any other action you want with the filters
  };
  return (
    <div className="relative w-full h-screen">
         <Navebar/>
      <img
        src="https://www.make-it-in-germany.com/fileadmin/_processed_/5/b/csm_H_1__iStock.com_Charday_Penn_a07f9f51c8.jpg"
        alt="Landing"
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>

      <div className="absolute top-0 left-0 w-full p-4 z-10">
      <SearchButton onSearch={handleSearch} />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <Partners/>
      </div>
     
    </div>
  );
}
