require('dotenv').config(); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS, 
  },
});

const sendEmail = (req, res) => {
  const { companyEmail, firstName, jobTitle, companyName } = req.body;

  if (!companyEmail || !firstName || !jobTitle || !companyName) {
    return res.status(400).json({
      message: 'Missing required fields: companyEmail, firstName, or jobTitle',
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to: companyEmail,  
    subject: `Application for the position ${jobTitle} `,
    html: `
      <img src="https://img.freepik.com/free-vector/call-center-customer-service-job-animation-vector-design_40876-2570.jpg" alt="Image" />  
      <p>Dear ${companyName} Recruitment Team,</p>
      <p>I am writing to express my interest in the position of ${jobTitle} at your company ${companyName}. I would love to learn more about the role and discuss how my skills align with the needs of your team.</p>
      <p>Thank you for considering my application. I look forward to the opportunity to contribute to your company.</p>
      <p>Best regards,</p>
      <p>${firstName}</p>
      <br />
      
    `, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
      return res.status(500).json({ message: 'Error occurred', error });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Email sent successfully', info });
    }
  });
};

module.exports = { sendEmail };
