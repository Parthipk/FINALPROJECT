import React from 'react'
import Navbar from '../homepage/Navebar'
import SearchButton from '../homepage/SearchButton'

export default function FirstAbout() {
  return (
    <div>
      <Navbar/>
      <div className="w-full h-[400px] bg-black flex items-center justify-center">
        <h1 className="text-center text-5xl text-white font-pj font-bold my-20  ">About Us </h1>
    </div>
    </div>
  )
}
