const mongoose = require('mongoose')

const adminAcessRequestScheema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    hashPassword: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    cource: {
        type: String,
        require: true
    }
})

const AdminAcessRequestModel=mongoose.model("AdminAcessRequest",adminAcessRequestScheema)

module.exports=AdminAcessRequestModel