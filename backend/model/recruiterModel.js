const mongoose = require("mongoose");

const recruiterModel = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    companyName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  
    },

    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/, 
    },

    jobTitle: {
        type: String,
        required: true,
    },

    experience: {
        type: String,
        required: true,
    },

    companyLocation: {
        type: String,
        required: true,
    },

    workModel: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    confirmPassword: {
        type: String,
    },

    jobDescription: {
        type: String,
        required: true,
    },
 
});

const Recruiter = mongoose.model("Recruiter", recruiterModel);

module.exports = Recruiter;
