const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    hashPassword:{
       type:String,
       require:true
    },
    role:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    cource:{
        type:String,
        require:true
    },
    passoutYear:{
        type:Date
    }
})

const UserModel=mongoose.model("user",userSchema)

module.exports=UserModel