const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    hashPaaword:{
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