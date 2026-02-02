const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email Address is required"],
        unique: true
    },
    phone:{
        type: String,
        required: [true, "Phone Number is required"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    address:{
        type: String,
        default:""
    },
    pin:{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:""
    },
    city:{
        type: String,
        default:""
    },
    otp:{
        type: Number,
        default: -2342342545588482
    },
    pic:{
        type:String,
        default:""
    },
    active:{
        type: Boolean,
        default: true
    }
})

const User = new mongoose.model("User", UserSchema);

module.exports = User; 
