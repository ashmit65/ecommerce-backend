const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: [true, "User Id is required"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: [true, "Product Id is required"],
    },
    qty: {
        type: Number,
        required: [true, "Cart Product Quantity is required"],
    },
    total: {
        type: String,
        required: [true, "Total Amount is required"],
    }
})

const Cart = new mongoose.model("Cart", CartSchema);

module.exports = Cart; 
