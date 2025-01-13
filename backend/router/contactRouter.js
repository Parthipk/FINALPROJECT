
const express = require("express")
const contactController = require("../controller/contactController")
const contactRouter = express.Router()

contactRouter.post('/contact',contactController.createContactMessage)
contactRouter.post('/contactDisplay',contactController.getAllContactMessages)

module.exports = contactRouter