const express = require('express');
const userRoutes=require('./routes/user');
const cors = require('cors');
const path = require('path');
const bodyParser=require('body-parser');

require('./utils/database');
const indexRoutes=require('./routes/index');
const courseRoutes=require('./routes/course');
// const upload=require('./public/js/index');

const app=express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,"public")))

app.set("view engine","ejs")
app.set("views","views")

app.use(indexRoutes)
app.use(courseRoutes)
// app.use("/",(req,res)=>res.send("hiii"))
app.use("/user",userRoutes)

app.listen(4000,()=>console.log("server is running"))