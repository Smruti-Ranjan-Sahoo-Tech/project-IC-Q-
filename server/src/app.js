const express=require('express')
const authRouter=require('./routes/auth.routes')
const superadminRouter=require('./routes/superadmin.routes')
const cors=require('cors')

const app=express()

app.use(cors())
app.use(express.json())
app.use("/auth",authRouter)
app.use("superadmin",superadminRouter)

app.get("/",(req,res)=>{
    res.send({
        message:"API Working😂"
    })
})

module.exports=app
