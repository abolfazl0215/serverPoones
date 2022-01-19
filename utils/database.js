const mongoose = require('mongoose');

const connectDB= async () =>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`connect to database by ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}


module.exports = connectDB
// mongoose.connect("mongodb://localhost/User",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>console.log("connected to database"))
//     .catch(err=>console.log(err))