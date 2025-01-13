import React, { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    coverletter: '',
    resume: null, // Added to store the resume file
  });

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Handle file input change
      setFormData(prevData => ({
        ...prevData,
        resume: files[0], // Only the first file selected
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    for (const key in formData) {
      if (formData[key] === '' && key !== 'resume') { // Skip validation for file upload
        alert(`${key} cannot be empty`);
        return;
      }
    }

    // Prepare FormData object to handle both text and file data
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:3000/user/Form', {
        method: 'POST',
        body: formDataToSend, // Send FormData (multipart/form-data)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully:', result);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          password: '',
          confirmPassword: '',
          coverletter: '',
          resume: null, // Reset resume
        });
      } else {
        console.error('Error submitting form:', result.message);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately (e.g., network error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="w-[80%]"> {/* Main container with 80% width */}

        {/* Single Form Container */}
        <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* Form needs to have encType for file upload */}

          {/* First Name and Last Name Fields */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4 flex space-x-6">
            <div className="flex-1">
              <label htmlFor="firstName" className="text-lg font-semibold block">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="text-lg font-semibold block">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="email" className="text-lg font-semibold block">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone Field */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="phone" className="text-lg font-semibold block">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Location Field */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="location" className="text-lg font-semibold block">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Password and Confirm Password Fields */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4 flex space-x-6">
            <div className="flex-1">
              <label htmlFor="password" className="text-lg font-semibold block">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="confirmPassword" className="text-lg font-semibold block">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Cover Letter Field */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="coverletter" className="text-lg font-semibold block">Cover Letter</label>
            <textarea
              id="coverletter"
              name="coverletter"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Write your cover letter"
              rows="4"
              value={formData.coverletter}
              onChange={handleChange}
            />
          </div>

          {/* Resume Upload Section */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="resume" className="text-lg font-semibold block">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf, .docx"
              onChange={handleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start mb-4">
            <button 
              type="submit"
              className="bg-[#c7e8e4] text-black px-6 py-2 rounded-md shadow-md hover:bg-[#b0d1cc]"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
