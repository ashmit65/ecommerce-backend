const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subcategory name is required"],
        unique:true
    },
    active:{
        type: Boolean,
        default: true
    }
})

const Subcategory = new mongoose.model("Subcategory", SubcategorySchema);

module.exports = Subcategory; 
