const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        unique:true
    },
    pic:{
        type:String,
        required:[true, "Brand pic required"]
    },
    active:{
        type: Boolean,
        default: true
    }
})

const Brand = new mongoose.model("Brand", BrandSchema);

module.exports = Brand; 
