import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:3000/user/contact', formData);
      if (response.status === 201) {
        setSuccess('Your message has been sent successfully!');
      }
      
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Contact Information */}
        <div>
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">
            You Will Grow, You Will Succeed. We Promise That
          </h1>
          <p className="text-lg text-center text-gray-400 mb-8">
            We're here to help! Get in touch with us for any inquiries.
          </p>

          <div className="grid grid-cols-2 gap-8">
            {/* Location */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-4xl text-[#309689] mb-4">
                <i className="fas fa-map-marker-alt"></i> {/* Location Icon */}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Location</h2>
              <p className="text-gray-600">Melechovva, Kerala</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-4xl text-[#309689] mb-4">
                <i className="fas fa-envelope"></i> {/* Email Icon */}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
              <p className="text-gray-600">contact@example.com</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-4xl text-[#309689] mb-4">
                <i className="fas fa-phone-alt"></i> {/* Phone Icon */}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Phone</h2>
              <p className="text-gray-600">+91 123 456 7890</p>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-4xl text-[#309689] mb-4">
                <i className="fas fa-clock"></i> {/* Clock Icon */}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Opening Hours</h2>
              <p className="text-gray-600">Mon - Fri: 9 AM - 6 PM</p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-[#EBF5F4] p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-[#309689] focus:border-[#309689] outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-[#309689] focus:border-[#309689] outline-none"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-2 p-3 w-full h-32 border border-gray-300 rounded-lg focus:ring-[#309689] focus:border-[#309689] outline-none"
                required
              ></textarea>
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Send Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-[#309689] text-white text-lg font-semibold rounded-lg hover:bg-[#267a64] transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
