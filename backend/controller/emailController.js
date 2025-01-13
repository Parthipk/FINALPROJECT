const nodemailer = require('nodemailer');
const handler = require('express-async-handler');

// Controller for sending email
const recruiterController = {
  sendJobDetailsEmail: handler(async (req, res) => {
    const { companyEmail, jobTitle, companyName } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to: companyEmail, // Recipient's email
      subject: `Job Details Inquiry - ${jobTitle}`,
      text: `Hello ${companyName},\n\nA user is interested in the job details for the position: ${jobTitle}. Please provide more details.\n\nThank you!`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);  // Log error on server
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  }),
};

module.exports = recruiterController;
