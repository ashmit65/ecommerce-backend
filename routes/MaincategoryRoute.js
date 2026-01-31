const Maincategory = require('express').Router();

const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/MaincategoryController");

Maincategory.post("/", createRecord);
Maincategory.get("/", getAllRecords);
Maincategory.get("/:_id", getSingleRecord);
Maincategory.put("/:_id", updateRecord);
Maincategory.delete("/:_id", deleteRecord);


module.exports = Maincategory;
