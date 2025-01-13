import React from 'react';
import { Heading } from './data'; 

export default function Header() {
  return (
    <div>

<h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj ml-20 ">{Heading[0].title}</h1>
    
    </div>
  );
}
