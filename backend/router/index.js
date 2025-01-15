const express = require("express")
const applicantRouter = require("./applicantRouter")
const recruiterRouter = require("./recruiterRouter")
const contactRouter = require("./contactRouter")
const {sendEmail} = require("../controller/emailController")
const router = express.Router()

router.use('/user',applicantRouter)
router.use('/recruiter',recruiterRouter)
router.use('/user',contactRouter)
router.post('/send',sendEmail)
module.exports = router