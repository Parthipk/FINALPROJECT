import React, { useState, useEffect } from 'react';
import logo from '../../assets/home/Logo.png';
import { useNavigate, Link } from 'react-router-dom';
import Popup from './Popup'; // Import Popup component for Applicant Login
import Popup2 from './Popop2'; // Import Popup2 component for Recruiter Login
import Cookie from 'js-cookie'; // Import js-cookie
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon from react-icons (FontAwesome)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle applicant popup visibility
  const [isPopup2Open, setIsPopup2Open] = useState(false); // State to handle recruiter popup visibility
  const [userName, setUserName] = useState(''); // State to store the username (firstName or companyName)
  const [userRole, setUserRole] = useState(''); // State to store the role (candidate or recruiter)

  const navigate = useNavigate(); // Initialize navigate function

  // Handle scroll event to change navbar style
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Attach the scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener on component unmount
    };
  }, []); // Empty array ensures this runs only once (on mount)

  useEffect(() => {
    const interval = setInterval(() => {
      const firstName = Cookie.get('firstName');
      const companyName = Cookie.get('companyName');
      
      if (firstName) {
        setUserName(firstName); // If it's a candidate, set first name
        setUserRole('candidate'); // Set the role as candidate
      } else if (companyName) {
        setUserName(companyName); // If it's a recruiter, set company name
        setUserRole('recruiter'); // Set the role as recruiter
      } else {
        // If neither cookie exists, trigger logout logic
        handleLogout();
      }
    }, 1000); // Update every second

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []); // The empty array ensures this useEffect only runs on mount and unmount

  // Toggle applicant popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Toggle recruiter popup visibility
  const togglePopup2 = () => {
    setIsPopup2Open(!isPopup2Open);
  };

  const handleLogout = () => {
    Cookie.remove('firstName'); // Remove the firstName cookie
    Cookie.remove('companyName'); // Remove the companyName cookie
    setUserName(''); // Reset the username state
    setUserRole(''); // Reset the user role state
    console.log("User logged out");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ${scrolled ? 'bg-black' : 'bg-transparent'} text-white z-50`}
      >
        <div className="flex items-center justify-between mx-auto">
          {/* Logo - Left-aligned */}
          <div className="flex items-center justify-start">
            <Link to="/">
              <img src={logo} alt="Logo" className="mr-3 w-auto h-9" />
            </Link>
          </div>

          {/* Navigation Links as Buttons */}
          <div className="flex space-x-10 mx-auto mr-4">
            <button onClick={() => navigate('/')} className="text-white bg-transparent w-84 py-2 px-4 rounded">
              Home
            </button>
            <button onClick={() => navigate('/jobs')} className="text-white bg-transparent w-84 py-2 px-4 rounded">
              Jobs
            </button>
            <button onClick={() => navigate('/about')} className="text-white bg-transparent w-84 py-2 px-4 rounded">
              About
            </button>
            <button onClick={() => navigate('/contact')} className="text-white bg-transparent w-84 py-2 px-4 rounded">
              Contact
            </button>
          </div>

          {/* Buttons - Right-aligned */}
          <div className="flex space-x-4 ml-auto">
            {userName ? (
              <>
                <span className="text-white py-2 px-4">{`Welcome ${userRole === 'candidate' ? 'Candidate' : 'Recruiter'} , ${userName} `}</span> 
                <button
                  className="text-white py-2 px-4"
                  onClick={handleLogout} // Logout action
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-white py-2 px-4"
                  onClick={togglePopup} // Toggle applicant popup visibility when clicked
                >
                  Applicant Login
                </button>

                <button
                  className="bg-[#309689] text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={togglePopup2} // Toggle recruiter popup visibility when clicked
                >
                  Recruiter Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Pass isOpen state and togglePopup function to Popup component */}
      {isPopupOpen && <Popup togglePopup={togglePopup} />}

      {/* Pass isOpen state and togglePopup2 function to Popup2 component */}
      {isPopup2Open && <Popup2 togglePopup={togglePopup2} />}
    </>
  );
}
