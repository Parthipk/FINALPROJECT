const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handler = require('express-async-handler');
const Recruiter = require('../model/recruiterModel');

const recruiterController = {
   
    Login: handler(async (req, res) => {
        try {
            const { companyName, password } = req.body;
    
            if (!companyName || !password) {
                return res.status(400).json({ message: "Enter all credentials" });
            }
    
            const recruiter = await Recruiter.findOne({ companyName });
    
            if (!recruiter) {
                return res.status(404).json({ message: "Recruiter not found. Please Sign in." });
            }
            const isPasswordCorrect = await bcrypt.compare(password, recruiter.password);
    
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Incorrect password" });
            }
    
            const payload = {
                firstName: recruiter.firstName,
                lastName: recruiter.lastName,
                companyName: recruiter.companyName,  // Include companyName in the payload
                id: recruiter._id
            };
    
            const token = jwt.sign(payload, process.env.JWT_SECRET);
    
            res.cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, 
                httpOnly: true,               
                secure: false,                
                sameSite: 'none',              
            });
    
            res.status(200).json({
                message: "Login successful",
                recruiter: {
                    firstName: recruiter.firstName,
                    lastName: recruiter.lastName,
                    companyName: recruiter.companyName // Include companyName in the response
                },
            });
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }),
    
    Form: handler(async (req, res) => {
        const {
            firstName,
            lastName,
            companyName,
            email,
            phone,
            jobTitle,
            experience,
            companyLocation,
            workModel,
            password,
            confirmPassword, 
            jobDescription,
        } = req.body;
    
        if (!firstName || !lastName || !companyName || !email || !phone || !jobTitle || !experience || 
            !companyLocation || !workModel || !password || !confirmPassword || 
            !jobDescription) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
    
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
    
        const existingRecruiter = await Recruiter.findOne({ email });
    
        if (existingRecruiter) {
            return res.status(400).json({ message: 'Recruiter with this email already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newRecruiter = new Recruiter({
            firstName,
            lastName,
            companyName,
            email,
            phone,
            jobTitle,
            experience,
            companyLocation,
            workModel,
            password: hashedPassword,  
            jobDescription,
        });
        const savedRecruiter = await newRecruiter.save();
    
        const payload = {
            firstName: savedRecruiter.firstName,
            lastName: savedRecruiter.lastName,
            email: savedRecruiter.email,
            id: savedRecruiter._id
        };
    
       
        const token = jwt.sign(payload, process.env.JWT_SECRET);
    
        
        res.cookie('token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly: true,              
            secure: false,               
            sameSite: 'none',              
        });
    
        res.status(201).json({
            message: 'Recruiter registered successfully',
            recruiter: {
                firstName: savedRecruiter.firstName,
                lastName: savedRecruiter.lastName,
                email: savedRecruiter.email,
                phone: savedRecruiter.phone,
                companyName: savedRecruiter.companyName,
                jobTitle: savedRecruiter.jobTitle,
                jobDescription: savedRecruiter.jobDescription,
            }
        });
    }),

    getAllRecruiters: handler(async (req, res) => {
        try {
          const recruiters = await Recruiter.find({}); 
          res.status(200).json(recruiters); 
        } catch (error) {
          res.status(500).json({ message: 'Failed to fetch recruiters', error });
        }
      })
    
    
};

module.exports = recruiterController;
