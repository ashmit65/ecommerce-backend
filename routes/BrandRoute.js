const Brand = require('express').Router();
const {brandUploder} = require("../middleware/fileUploader")

const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/BrandController");

Brand.post("/",brandUploder.single("pic"), createRecord);
Brand.get("/", getAllRecords);
Brand.get("/:_id", getSingleRecord);
Brand.put("/:_id",brandUploder.single("pic"), updateRecord);
Brand.delete("/:_id", deleteRecord);


module.exports = Brand;
