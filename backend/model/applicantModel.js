const mongoose = require("mongoose");

const applicantModel = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  
    },

    phone: {
        type: String,
        required: true 
    },

    location: {
        type: String,
        required: true,
    },

    coverletter: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
      },
    password: {
        type: String,
        required: true,
        minlength: 6,  
    },
    confirmPassword : {
        type: String,
        minlength: 6,  
    },
});


const candidate = new mongoose.model("candidate", applicantModel);

module.exports = candidate;
