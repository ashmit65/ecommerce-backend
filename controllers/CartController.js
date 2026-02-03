const Cart = require("../models/Cart");
const fs = require("fs");
const path = require("path");

async function createRecord(req, res) {
  try {
    const data = new Cart(req.body);
    await data.save();
    res.send({
      result: "Done",
      data: data,
      message: "Record Created Successfully",
    });
  } catch (error) {
    console.log(error);
    const errorMessage = [];
      error.errors?.user
        ? errorMessage.push({ user: error.errors.user.message })
        : "";
      error.errors?.product
        ? errorMessage.push({ product: error.errors.product.message })
        : "";
      error.errors?.qty
        ? errorMessage.push({ qty: error.errors.qty.message })
        : "";
      error.errors?.total
        ? errorMessage.push({ total: error.errors.total.message })
        : "";
    errorMessage.length === 0
      ? res
          .status(500)
          .send({ result: "Fail", reason: "Internal server error" })
      : res.status(500).send({ result: "Fail", reason: errorMessage });
  }
}

async function getAllRecords(req, res) {
  try {
    const data = await Cart.find().sort({ _id: -1 });
    res.send({ result: "Done", count: data.length, data: data });
  } catch (err) {
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function getSingleRecord(req, res) {
  try {
    // const data = await Cart.findOne().sort({_id:req.params._id});
    const data = await Cart.findById(req.params._id);

    if (data) res.send({ result: "Done", data: data });
    else res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function updateRecord(req, res) {
  try {
    // const data = await Cart.findOne().sort({_id:req.params._id});
    const data = await Cart.findById(req.params._id);
    if (!data) {
      return res.send({
        result: "Fail",
        reason: "Invalid ID, No record Found",
      });
    }
    data.qty = req.body.qty ?? data.qty;
    data.total = req.body.total ?? data.total;

     } catch (error) {
    console.log(error);
    
    errorMessage.length === 0
      ? res
          .status(500)
          .send({ result: "Fail", reason: "Internal server error" })
      : res.status(500).send({ result: "Fail", reason: errorMessage });
  }
}

async function deleteRecord(req, res) {
  try {
    const data = await Cart.findById(req.params._id);
    
    if (!data) {
      return res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
    }
    
    const filePath = path.join(process.cwd(), "public", data.pic);
    
    const deletedData = await Cart.findByIdAndDelete(req.params._id);
    
    if (deletedData) {
      res.send({ result: "Done", message: "Record Deleted Successfully" });
    } else {
      res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

module.exports = {
  createRecord,
  getAllRecords,
  getSingleRecord,
  updateRecord,
  deleteRecord,
};
