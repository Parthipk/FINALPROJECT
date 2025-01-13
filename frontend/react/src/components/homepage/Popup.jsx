import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import Cookie from 'js-cookie'; // Import js-cookie to handle cookies

export default function Popup({ togglePopup }) {
  const [firstName, setFirstName] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // To store any error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the login data
    const loginData = { firstName, password }; // Using firstName instead of username

    try {
      // Send the login data to the backend API
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // If login is successful, you can handle the success and store firstName in the cookie
        Cookie.set('firstName', firstName, { expires: 1 }); 
        console.log('Login successful:', result);
        togglePopup(); 
      } else {
        setError(result.message || 'An error occurred. Please try again.');
        console.error('Login failed:', result.message || 'Unknown error');
      }
    } catch (error) {
      // Handle network or other errors
      setError('Network error. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
        {/* Close Button at the top right */}
        <button
          onClick={togglePopup}
          className="absolute top-2 right-2 text-gray-500 text-2xl hover:text-gray-700"
        >
          &times; {/* This is the "X" symbol for close */}
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message if any */}
          
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}  // Changed to firstName
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
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* "Sign in" message with link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          If not signed in, please{' '}
          <Link to="/candidateLogin" className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
            sign in
          </Link>.
        </p>
      </div>
    </div>
  );
}
