const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Testimonial name is required"]
    },
    message:{
        type: String,
        required:[true, "Message is required"]
    },
    pic:{
        type:String,
        required:[true, "Testimonial pic required"]
    },
    active:{
        type: Boolean,
        default: true
    }
})

const Testimonial = new mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial; 
