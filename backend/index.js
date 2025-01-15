const express = require("express")
const router = require("./router");
require('dotenv').config();
const app = express()
const cors = require("cors");
app.use(express.json());
const Connect_DB = require("./dbConnection/mono");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = 3000
app.use(cors())
Connect_DB()

app.use('/',router)

app.listen(port,()=>{
    console.log("server connected succesfully")
})