const Subcategory = require('express').Router();

const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/SubcategoryController");

Subcategory.post("/", createRecord);
Subcategory.get("/", getAllRecords);
Subcategory.get("/:_id", getSingleRecord);
Subcategory.put("/:_id", updateRecord);
Subcategory.delete("/:_id", deleteRecord);


module.exports = Subcategory;
