const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handler = require('express-async-handler');
const candidate = require('../model/applicantModel');

// Configure storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resumes/');  // Folder where resumes will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Generate unique filename
    }
});

// File filter to accept only PDF and DOCX files
const fileFilter = (req, file, cb) => {
    const fileTypes = /pdf|docx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'));
    }
};

// Initialize multer with the storage and file filter
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }  // File size limit (10MB)
});

const applicantController = {
    // Form submission with resume upload
    Form: handler(async (req, res) => {
        // First, handle the file upload with multer
        upload.single('resume')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message }); // Handle file upload error
            }

            const { firstName, lastName, email, phone, location, coverletter, password, confirmPassword } = req.body;

            if (!firstName || !lastName || !email || !phone || !location || !coverletter || !password) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const existingApplicant = await candidate.findOne({ email });

            if (existingApplicant) {
                return res.status(400).json({ message: 'Applicant with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10); 
            
            let resumePath = '';
            // If a file was uploaded, store its path
            if (req.file) {
                resumePath = req.file.path;
            }

            const newApplicant = new candidate({
                firstName,
                lastName,
                email,
                phone,
                location,
                coverletter,
                password: hashedPassword,
                resume: resumePath,  // Save the resume path
            });

            const savedApplicant = await newApplicant.save();

            const payload = {
                firstName: savedApplicant.firstName,
                lastName: savedApplicant.lastName,
                email: savedApplicant.email,
                id: savedApplicant._id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET);

            res.cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day
                httpOnly: true,
                secure: false,  // Use true in production
                sameSite: 'none',
            });

            res.status(201).json({
                message: 'Applicant registered successfully',
                applicant: {
                    firstName: savedApplicant.firstName,
                    lastName: savedApplicant.lastName,
                    email: savedApplicant.email,
                    phone: savedApplicant.phone,
                    location: savedApplicant.location,
                    resume: savedApplicant.resume,  // Include the resume path in the response
                }
            });
        });
    }),

    // Login route (no change needed)
    Login: handler(async (req, res) => {
        try {
            const { firstName, password } = req.body;

            if (!firstName || !password) {
                return res.status(400).json({ message: "Enter all credentials" });
            }

            const user = await candidate.findOne({ firstName });

            if (!user) {
                return res.status(404).json({ message: "User not found. Please Sign in." });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            res.status(200).json({
                message: "Login successful",
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }),

    // Display all applicants (no change needed)
    displayall: handler(async (req, res) => {
        try {
            // Fetch all applicants from the database
            const applicants = await candidate.find();

            if (applicants.length === 0) {
                return res.status(404).json({ message: 'No applicants found' });
            }

            res.status(200).json({
                message: 'Applicants fetched successfully',
                applicants: applicants.map(applicant => ({
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    email: applicant.email,
                    phone: applicant.phone,
                    location: applicant.location,
                    resume:applicant.resume,
                }))
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching applicants' });
        }
    })
};

module.exports = applicantController;
