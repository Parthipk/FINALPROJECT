import React from 'react';
import logo from '../../assets/home/Logo.png'
export default function Footer() {
  return (
    <div className="bg-black text-white py-8 mt-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        {/* First Column - Logo and Description (50%) */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-auto h-12" />
          </div>
          <p className="mt-4">
            This is a short description of the company or blog. It explains the mission, vision, or any important details.
          </p>
        </div>

        {/* Second Column - Navigation Links (25%) */}
        <div className="text-sm">
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#home" className="hover:text-gray-400">Home</a></li>
            <li><a href="#about" className="hover:text-gray-400">About</a></li>
            <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
            <li><a href="#blog" className="hover:text-gray-400">Blog</a></li>
          </ul>
        </div>

        {/* Third Column - Additional Links (25%) */}
        <div className="text-sm">
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul>
            <li><a href="#privacy" className="hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-gray-400">Terms of Service</a></li>
            <li><a href="#faq" className="hover:text-gray-400">FAQ</a></li>
            <li><a href="#support" className="hover:text-gray-400">Support</a></li>
          </ul>
        </div>
      </div>

     <div className="flex justify-center items-center text-sm text-gray-400 underline mt-12">
  <p>&copy; 2025 Company Name. All rights reserved.</p>
</div>

    </div>
  );
}
