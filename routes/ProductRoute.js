const Product = require('express').Router();
const {productUploder} = require("../middleware/fileUploader")

const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/ProductController");

Product.post("/",productUploder.array("pic"), createRecord);
Product.get("/", getAllRecords);
Product.get("/:_id", getSingleRecord);
Product.put("/:_id",productUploder.array("pic"), updateRecord);
Product.delete("/:_id", deleteRecord);


module.exports = Product;
