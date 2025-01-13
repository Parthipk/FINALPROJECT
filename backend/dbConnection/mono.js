const mongoose = require("mongoose")

const Connect_DB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully")
    }catch(error){
        console.error("not Connected",error)

    }

}

module.exports = Connect_DB