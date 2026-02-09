const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hashPassword:{
       type:String,
       required:true
    },
    role:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    cource:{
        type:String,
        required:true
    },
    passoutYear:{
        type:Date
    }
})

const UserModel=mongoose.model("User",userSchema)

module.exports=UserModel