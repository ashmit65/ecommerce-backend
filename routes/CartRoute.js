const CartRoute = require('express').Router();

const {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/CartController");

CartRoute.post("/", createRecord);
CartRoute.get("/", getAllRecords);
CartRoute.get("/:_id", getSingleRecord);
CartRoute.put("/:_id", updateRecord);
CartRoute.delete("/:_id", deleteRecord);


module.exports = CartRoute;
