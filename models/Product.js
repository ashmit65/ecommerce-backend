const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Maincategory",
        required: [true, "Maincategory name is required"],
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subcategory",
        required: [true, "Subcategory name is required"],
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Brand",
        required: [true, "Brand name is required"],
    },
    color: {
        type: String,
        required: [true, "Product color is required"],
    },
    size: {
        type: String,
        required: [true, "Product size is required"],
    },
    basePrice: {
        type: Number,
        required: [true, "Product Base Price is required"],
    },
    discount: {
        type: Number,
        required: [true, "Product Discount Price is required"],
    },
    finalPrice: {
        type: Number,
        required: [true, "Product Discount Price is required"],
    },
    stock: {
        type: Boolean,
        default: true
    },
    stockQuantity:{
        type: Number,
        required: [true, "Product Stock Quantity is required"]
    },
    description:{
        type: String,
        default:""
    },
    pic:[

    ],
    active:{
        type: Boolean,
        default: true
    }
})

const Brand = new mongoose.model("Brand", BrandSchema);

module.exports = Brand; 
