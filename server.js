const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser=require('body-parser');
const dotEnv = require('dotenv');
const passport = require("passport");
const session = require('express-session');

const userRoutes=require('./routes/user');
const courseRoutes = require('./routes/course');
const commentRoutes=require('./routes/comment');
const connectDB = require('./utils/database');

require('./utils/database');
// const upload=require('./public/js/index');

// env
dotEnv.config({path:"./config/config.env"})

// connect to database
connectDB()

//* Passport Configuration
require("./config/passport");

const app=express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,"public")))

// set template engine
app.set("view engine","ejs")
app.set("views", "views")

//* Session
app.use(
    session({
        secret: "secret",
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
    })
);

//* Passport
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use(courseRoutes)
app.use(userRoutes)
app.use(commentRoutes)
// app.use("/getComment",(req,res)=>{res.json({message:"hiiiii"}),res.send("hiii get")})
app.use("/", (req, res) => {
    res.send("hiiii")
})

app.listen(3000)