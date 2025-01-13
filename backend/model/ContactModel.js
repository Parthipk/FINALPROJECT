const mongoose = require("mongoose");

const ContactModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  
    },

});


const contactData = new mongoose.model("contactData", ContactModel );

module.exports = contactData;
