const ContactModel = require("../model/ContactModel");

const contactController = {
  
  createContactMessage: async (req, res) => {
    const { name, message, email } = req.body;

    if (!name || !message || !email) {
      return res.status(400).json({ message: 'Please provide all required fields: name, message, and email' });
    }

    const newContact = new ContactModel({
      name,
      message,
      email,
    });

    try {
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving the contact message' });
    }
  },

  getAllContactMessages: async (req, res) => {
    try {
      const contacts = await ContactModel.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching contact messages' });
    }
  }
};

module.exports = contactController;
