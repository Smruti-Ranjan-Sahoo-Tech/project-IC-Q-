const express=require('express')
const authRouter=require('./routes/auth.routes')
const superadminRouter=require('./routes/superadmin.routes')
const path = require("path");
const cors=require('cors')
const methodOverride = require('method-override');
const app=express()
const cookieParser = require("cookie-parser");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override middleware
app.use(methodOverride('_method'));

// Cookie parser middleware
app.use(cookieParser());

// CORS middleware
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/superadmin", superadminRouter);

app.get("/", (req, res) => {
    res.send({
        message: "API Working😂"
    })
})

module.exports=app
