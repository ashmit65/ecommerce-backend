const Testimonial = require('express').Router();
const {testimonialUploder} = require("../middleware/fileUploader")

const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/TestimonialController");

Testimonial.post("/",testimonialUploder.single("pic"), createRecord);
Testimonial.get("/", getAllRecords);
Testimonial.get("/:_id", getSingleRecord);
Testimonial.put("/:_id",testimonialUploder.single("pic"), updateRecord);
Testimonial.delete("/:_id", deleteRecord);


module.exports = Testimonial;
