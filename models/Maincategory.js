const mongoose = require("mongoose");

const MaincategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Maincategory name is required"],
        unique:true
    },
    active:{
        type: Boolean,
        default: true
    }
})

const Maincategory = new mongoose.model("Maincategory", MaincategorySchema);

module.exports = Maincategory; 
