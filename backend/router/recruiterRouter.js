const express = require("express")
const recruiterController = require("../controller/recruiterController")
const sendJobDetailsEmail  = require("../controller/emailController")
const recruiterRouter = express.Router()

recruiterRouter.post('/login',recruiterController.Login)
recruiterRouter.post('/Form',recruiterController.Form)
recruiterRouter.post('/get',recruiterController.getAllRecruiters)
recruiterRouter.post('/send-job-details',sendJobDetailsEmail.sendJobDetailsEmail)


module.exports = recruiterRouter