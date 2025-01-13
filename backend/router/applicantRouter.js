const express = require("express")
const applicantController = require("../controller/applicantController")
const isauth = require("../middleware/isauth")
const applicantRouter = express.Router()



applicantRouter.post('/Form',applicantController.Form)
applicantRouter.post('/login',applicantController.Login)
applicantRouter.post('/display',applicantController.displayall)

module.exports = applicantRouter