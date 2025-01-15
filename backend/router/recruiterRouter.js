const express = require("express")
const recruiterController = require("../controller/recruiterController")
const recruiterRouter = express.Router()

recruiterRouter.post('/login',recruiterController.Login)
recruiterRouter.post('/Form',recruiterController.Form)
recruiterRouter.post('/get',recruiterController.getAllRecruiters)


module.exports = recruiterRouter