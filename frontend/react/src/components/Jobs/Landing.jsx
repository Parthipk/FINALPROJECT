import React from 'react'
import Navebar from '../homepage/Navebar'
import SearchButton from '../homepage/SearchButton'
import Jobs from '../homepage/Jobs'
export default function Landing() {
  return (
    <div>
        <Navebar/>
        <div className="w-full h-[400px] bg-black flex items-center justify-center">
            <h1 className="text-center text-5xl text-white font-pj font-bold my-20  ">Jobs</h1>
            <div className='absolute bottom-10'>
             <SearchButton/>
            </div>
        </div>
        <Jobs/> 
      
    </div>
  )
}
