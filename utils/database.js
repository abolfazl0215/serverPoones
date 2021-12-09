const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/User",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connected to database"))
    .catch(err=>console.log(err))