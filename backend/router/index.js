const express = require("express")
const applicantRouter = require("./applicantRouter")
const recruiterRouter = require("./recruiterRouter")
const contactRouter = require("./contactRouter")
const router = express.Router()

router.use('/user',applicantRouter)
router.use('/recruiter',recruiterRouter)
router.use('/user',contactRouter)

module.exports = router