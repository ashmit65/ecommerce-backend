const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

async function createRecord(req, res) {
  try {
    const data = new Product(req.body);
    if (req.files && req.files.length > 0) {
      data.pic = req.files.map(file => file.path.replace(/^public[\/]/, "").replace(/\\/g, "/"));
    }
    await data.save();
    let finalData = await Product.findOne({ _id: data._id })
    .populate([
      {
        path: "maincategory",
        select : "name -_id "
      },
      {
        path: "subcategory",
        select : "name -_id "
      },
      {
        path: "brand",
        select : "name -_id "
      }
    ])
    res.send({
      result: "Done",
      data: data,
      message: "Record Created Successfully",
    });
  } catch (error) {
    console.log(error);
    const errorMessage = [];
      error.errors?.name
        ? errorMessage.push({ name: error.errors.name.message })
        : "";
      error.errors?.maincategory
        ? errorMessage.push({ maincategory: error.errors.maincategory.message })
        : "";
      error.errors?.subcategory
        ? errorMessage.push({ subcategory: error.errors.subcategory.message })
        : "";
      error.errors?.brand
        ? errorMessage.push({ brand: error.errors.brand.message })
        : "";
      error.errors?.size
        ? errorMessage.push({ size: error.errors.size.message })
        : "";
      error.errors?.color
        ? errorMessage.push({ color: error.errors.color.message })
        : "";
      error.errors?.basePrice
        ? errorMessage.push({ basePrice: error.errors.basePrice.message })
        : "";
      error.errors?.discount
        ? errorMessage.push({ discount: error.errors.discount.message })
        : "";
      error.errors?.finalPrice
        ? errorMessage.push({ finalPrice: error.errors.finalPrice.message })
        : "";
      error.errors?.stock
        ? errorMessage.push({ stock: error.errors.stock.message })
        : "";
      error.errors?.stockQuantity
        ? errorMessage.push({ stockQuantity: error.errors.stockQuantity.message })
        : "";
    error.errors?.pic
      ? errorMessage.push({ pic: error.errors.pic.message })
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
    const data = await Product.find().sort({ _id: -1 });
    res.send({ result: "Done", count: data.length, data: data });
  } catch (err) {
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function getSingleRecord(req, res) {
  try {
    // const data = await Product.findOne().sort({_id:req.params._id});
    const data = await Product.findById(req.params._id);

    if (data) res.send({ result: "Done", data: data });
    else res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function updateRecord(req, res) {
  try {
    // const data = await Product.findOne().sort({_id:req.params._id});
    const data = await Product.findById(req.params._id);
    if (!data) {
      return res.send({
        result: "Fail",
        reason: "Invalid ID, No record Found",
      });
    }
    data.name = req.body.name ?? data.name;
    data.active = req.body.active ?? data.active;

    if (req.files && req.files.length > 0) {
      try {
        // Delete old image files if they exist
        if (data.pic && Array.isArray(data.pic)) {
          data.pic.forEach(picPath => {
            const oldFilePath = path.join(process.cwd(), "public", picPath);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
              console.log("✅ Old image file deleted");
            }
          });
        }
      } catch (err) {
        console.log("Delete error:", err.message);
      }
    
      // ✅ Save new file paths clean (no public)
      data.pic = req.files.map(file => file.path.replace(/^public[\/]/, "").replace(/\\/g, "/"));
    }

    await data.save();
    res.send({ result: "Done", message: "Recor Updated Successfully" });
  } catch (error) {
    console.log(error);
    const errorMessage = [];
      error.errors?.name
        ? errorMessage.push({ name: error.errors.name.message })
        : "";
    errorMessage.length === 0
      ? res
          .status(500)
          .send({ result: "Fail", reason: "Internal server error" })
      : res.status(500).send({ result: "Fail", reason: errorMessage });
  }
}

async function deleteRecord(req, res) {
  try {
    const data = await Product.findById(req.params._id);
    
    if (!data) {
      return res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
    }
    
    const deletedData = await Product.findByIdAndDelete(req.params._id);
    
    if (deletedData) {
      try {
        // Delete all associated image files
        if (deletedData.pic && Array.isArray(deletedData.pic)) {
          deletedData.pic.forEach(picPath => {
            const filePath = path.join(process.cwd(), "public", picPath);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log("✅ Image file deleted");
            }
          });
        }
      } catch (fileErr) {
        console.log("Error deleting files:", fileErr.message);
      }
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
