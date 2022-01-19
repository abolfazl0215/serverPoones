const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser=require('body-parser');
const dotEnv = require('dotenv');
const passport = require("passport");
const session = require('express-session');
const flash = require("connect-flash");


const userRoutes=require('./routes/user');
const connectDB = require('./utils/database');

require('./utils/database');
const indexRoutes=require('./routes/index');
const courseRoutes=require('./routes/course');
// const upload=require('./public/js/index');

// env
dotEnv.config({path:"./config/config.env"})

// connect to database
connectDB()

//* Passport Configuration
require("./config/passport");

const app=express();

app.use(cors())
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

// flash 
app.use(flash())

//routes
app.use(indexRoutes)
app.use(courseRoutes)
app.use(userRoutes)

const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))