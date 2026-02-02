const User = require('express').Router();
const {userUploder} = require("../middleware/fileUploader")

const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/UserController");

User.post("/",userUploder.single("pic"), createRecord);
User.get("/", getAllRecords);
User.get("/:_id", getSingleRecord);
User.put("/:_id",userUploder.single("pic"), updateRecord);
User.delete("/:_id", deleteRecord);


module.exports = User;
