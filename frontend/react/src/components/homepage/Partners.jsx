import React from 'react';
import image1 from '../../assets/home/2ndLogo.png'; 
import image2 from '../../assets/home/adobe.png';
import image3 from '../../assets/home/linear.png';
import image4 from '../../assets/home/slack.png';
import image5 from '../../assets/home/asana.png';

export default function Partners() {
  return (
    <div className="w-full bg-[#309689] h-20">
      <div className="flex justify-center items-center align-middle space-x-40  ">
        <div>
          <img src={image1} alt="Partner 1" className="h-12 w-auto object-contain  mt-5" />
        </div>
        <div>
          <img src={image2} alt="Partner 2" className="h-12 w-auto object-contain mt-5" />
        </div>
        <div>
          <img src={image3} alt="Partner 3" className="h-12 w-auto object-contain mt-5" />
        </div>
        <div>
          <img src={image4} alt="Partner 4" className="h-12 w-auto object-contain mt-5" />
        </div>
        <div>
          <img src={image5} alt="Partner 5" className="h-12 w-auto object-contain mt-5" />
        </div>
      </div>
    </div>
  );
}
