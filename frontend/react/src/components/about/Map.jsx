import React from 'react';

export default function Map() {
  return (
    <div className=" overflow-hidden text-red-500 w-[90%] h-[500px] mx-auto mt-20">
      <div id="embed-map-display" className="h-full w-full max-w-full">
        <iframe
          className="h-full w-full border-0"
          frameBorder="0"
          src="https://www.google.com/maps/embed/v1/place?q=Melechovva+Kannur&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          title="Melechovva, Kannur"
        ></iframe>
      </div>
      <a className="embed-map-html" href="https://www.bootstrapskins.com/themes" id="enable-map-info">
        premium bootstrap themes
      </a>
      <style>
        {`
          #embed-map-display img.text-marker {
            max-width: none !important;
            background: none !important;
          }
          img {
            max-width: none;
          }
        `}
      </style>
    </div>
  );
}
