import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import image from '../../assets/home/loginpage.jpg'; // Import your image

export default function Popup2({ togglePopup }) {
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/recruiter/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the company name in a cookie upon successful login
        Cookies.set('companyName', companyName, { expires: 1 }); // expires in 1 day
        alert('Login successful!');
        
        // Close the popup after successful login
        togglePopup();
        
        // You can handle success here, like redirecting or updating the UI
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[80%] md:w-[50%] relative flex">
        {/* Left Column - Image */}
        <div className="flex-1 ">
          <img
            src={image}  // Replace this with your actual image path
            alt="Placeholder"
            className="w-full h-full rounded-lg"
          />
        </div>

        {/* Right Column - Form */}
        <div className="flex-1 p-8">
          {/* Close Button at the top right */}
          <button
            onClick={togglePopup}
            className="absolute top-2 right-2 text-gray-500 text-2xl hover:text-gray-700"
          >
            &times; {/* Close icon */}
          </button>

          <h2 className="text-2xl font-semibold text-center mb-4">Recruiter Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message if any */}
            
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#309689] text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          {/* "Sign in" message with link */}
          <p className="mt-4 text-center text-sm text-gray-500">
            If not signed in, post job without{' '}
            <Link to="/recuterLogin" className="font-medium text-[#309689] cursor-pointer hover:text-blue-800">
              sign in
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
