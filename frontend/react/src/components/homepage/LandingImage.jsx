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
        src="https://static.vecteezy.com/system/resources/previews/029/882/486/non_2x/diversity-people-of-all-races-and-genders-together-free-photo.jpg"
        alt="Landing"
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>

      <div className="absolute -top-16 left-0 w-full p-4 z-10">
      <SearchButton onSearch={handleSearch} />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <Partners/>
      </div>
     
    </div>
  );
}
