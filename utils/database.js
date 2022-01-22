const mongoose = require('mongoose');

const connectDB = async () => {
    // mongodb://pounesir_pounes:abolfazl021@localhost:27017/pounesir_db
    try {
        const conn= await mongoose.connect('mongodb://localhost:27017/User',{
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