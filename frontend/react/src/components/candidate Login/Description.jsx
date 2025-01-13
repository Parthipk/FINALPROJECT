import React from 'react';
import { content } from './data';  // Correct import from the data file

export default function Description() {
  return (
    <div className='w-4/5 items-center mx-auto'>
      {content.map((item, index) => (
        <div key={index}>
          <h1 className="text-left text-4xl font-pj font-bold my-20">{item.heading}</h1>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
