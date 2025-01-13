import React, { useState } from 'react';

export default function RecruiterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phone: '',
        jobTitle: '',
        experience: '',
        companyLocation: '',
        workModel: '',
        jobDescription: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        for (const key in formData) {
            if (formData[key] === '') {
                setError('Please provide all required fields');
                return;
            }
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Basic email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(formData.email)) {
            setError('Invalid email address');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/recruiter/Form', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
        
            if (!response.ok) {
              const errorDetails = await response.json();
              setError(errorDetails.message || 'Error submitting the form');
              return;
            }
        
            const result = await response.json();
            setSuccessMessage(result.message || 'Recruiter registered successfully');
            setError(''); // Reset any previous errors
            setFormData({
              firstName: '',
              lastName: '',
              companyName: '',
              email: '',
              phone: '',
              jobTitle: '',
              experience: '',
              companyLocation: '',
              workModel: '',
              jobDescription: '',
              password: '',
              confirmPassword: '',
            }); // Clear form data
          } catch (error) {
            console.error('Error submitting the form:', error);
            setError('Error submitting the form');
          }
        
    };

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="w-[80%]"> {/* Main container with 80% width */}

        {/* Form Container */}
        <form onSubmit={handleSubmit}>

          {/* Display Errors and Success Message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

          {/* First Name and Last Name */}
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

          {/* Company Name */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="companyName" className="text-lg font-semibold block">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
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

          {/* Phone */}
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

          {/* Job Title and Experience */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4 flex space-x-6">
            <div className="flex-1">
              <label htmlFor="jobTitle" className="text-lg font-semibold block">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your job title"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="experience" className="text-lg font-semibold block">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Company Location */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="companyLocation" className="text-lg font-semibold block">Company Location</label>
            <input
              type="text"
              id="companyLocation"
              name="companyLocation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter company location"
              value={formData.companyLocation}
              onChange={handleChange}
            />
          </div>

          {/* Work Model (Dropdown) */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="workModel" className="text-lg font-semibold block">Work Model</label>
            <select
              id="workModel"
              name="workModel"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={formData.workModel}
              onChange={handleChange}
            >
              <option value="">Select work model</option>
              <option value="part-time">Part-time</option>
              <option value="full-time">Full-time</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Job Description */}
          <div className="bg-[#c7e8e4] p-4 rounded-lg shadow-lg mb-4">
            <label htmlFor="jobDescription" className="text-lg font-semibold block">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter job description"
              value={formData.jobDescription}
              onChange={handleChange}
            />
          </div>

          {/* Password and Confirm Password */}
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
