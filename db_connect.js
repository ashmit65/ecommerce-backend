const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const DB_URL = process.env.DB_URL

async function connectDB(){
    try{
        await mongoose.connect(DB_URL);
        console.log(`Database connected successfully`);
    }catch(err){
        console.log(`Database connection failed`, err);
    }
}

connectDB();


// mongoose.connect("mongodb://localhost:27017/server")
// .then(()=>{
//     console.log("Connection successful")
// })
// .catch((err)=>{
//     console.log("No connection", err);
// })