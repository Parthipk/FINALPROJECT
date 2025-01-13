import React, { useState } from 'react';
import { blogData } from './data';

export default function Blog() {

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);


  const handleClick = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  return (
    <div className="blog-container w-4/5 mx-auto">
      <h1 className="text-center text-5xl  text-gray-900  font-pj font-bold my-8">Top Company News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleClick(blog)}
          >
            <img
              src={blog.image}
              alt={`Blog ${blog.id}`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p>{blog.description}</p>
            </div>
          </div>
        ))}
      </div>


      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-4/5 relative">
          
            <button
              className="absolute top-4 right-4 text-5xl text-gray-600 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              <strong>&times;</strong>
            </button>

            <img
              src={popupContent.image}
              alt="Popup Content"
              className="w-full h-80 object-cover mb-4"
            />
            <div className="text-lg text-gray-900 mb-4">
              <p>{popupContent.description}</p>
            </div>
            <div className="text-base text-gray-700">
              <p>{popupContent.extraInfo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
