const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

async function createRecord(req, res) {
  try {
    const data = new Product(req.body);
    if (req.files && req.files.length > 0) {
      data.pic = req.files.map((file) => {
        console.log("Original file path:", file.path);
        const cleanPath = file.path.replace(/^public[\/]/, "").replace(/\\/g, "/");
        console.log("Cleaned path stored:", cleanPath);
        return cleanPath;
      });
    }
    await data.save();
    let finalData = await Product.findOne({ _id: data._id }).populate([
      {
        path: "maincategory",
        select: "name -_id ",
      },
      {
        path: "subcategory",
        select: "name -_id ",
      },
      {
        path: "brand",
        select: "name -_id ",
      },
    ]);
    res.send({
      result: "Done",
      data: finalData,
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
    const data = await Product.find()
      .sort({ _id: -1 })
      .populate([
        {
          path: "maincategory",
          select: "name -_id ",
        },
        {
          path: "subcategory",
          select: "name -_id ",
        },
        {
          path: "brand",
          select: "name -_id ",
        },
      ]);
    res.send({ result: "Done", count: data.length, data: data });
  } catch (err) {
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function getSingleRecord(req, res) {
  try {
    // const data = await Product.findOne().sort({_id:req.params._id});
    const data = await Product.findById(req.params._id).populate([
      {
        path: "maincategory",
        select: "name -_id ",
      },
      {
        path: "subcategory",
        select: "name -_id ",
      },
      {
        path: "brand",
        select: "name -_id ",
      },
    ]);

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
    data.maincategory = req.body.maincategory ?? data.maincategory;
    data.subcategory = req.body.subcategory ?? data.subcategory;
    data.brand = req.body.brand ?? data.brand;
    data.size = req.body.size ?? data.size;
    data.color = req.body.color ?? data.color;
    data.basePrice = req.body.basePrice ?? data.basePrice;
    data.discount = req.body.discount ?? data.discount;
    data.finalPrice = req.body.finalPrice ?? data.finalPrice;
    data.stock = req.body.stock ?? data.stock;
    data.stockQuantity = req.body.stockQuantity ?? data.stockQuantity;
    data.active = req.body.active ?? data.active;

    if (req.files && req.files.length > 0) {
      try {
        // Delete old image files if they exist
        // if (data.pic && Array.isArray(data.pic)) {
        // data.pic.forEach(picPath => {
        //   const oldFilePath = path.join(process.cwd(), "public", picPath);
        //   if (fs.existsSync(oldFilePath)) {
        //     fs.unlinkSync(oldFilePath);
        //     console.log("✅ Old image file deleted");
        //   }
        // });
        // }
      } catch (err) {
        // console.log("Delete error:", err.message);
      }

      // ✅ Save new file paths clean (no public)
      data.pic = data.pic.concat(
        req.files.map((x) =>
          x.path.replace(/^public[\/]/, "").replace(/\\/g, "/")
        )
      );
    }

    await data.save();
    let finalData = await Product.findOne({ _id: data._id }).populate([
      {
        path: "maincategory",
        select: "name -_id ",
      },
      {
        path: "subcategory",
        select: "name -_id ",
      },
      {
        path: "brand",
        select: "name -_id ",
      },
    ]);
    res.send({
      result: "Done",
      data: finalData,
      message: "Recor Updated Successfully",
    });
  } catch (error) {
    console.log(error);
          res.send({ result: "Fail", reason: "Internal server error" })
  }
}

async function deleteRecord(req, res) {
  try{
    const data = await Product.findById(req.params._id);
    
    if (!data) {
      return res.send({ result: "Fail", reason: "Invalid ID, Record not found" });
    }
    
    // Delete all associated image files
    if (data.pic && Array.isArray(data.pic) && data.pic.length > 0) {
      try {
        data.pic.forEach(picPath => {
          // Handle both cases: paths with and without "public/" prefix
          let fullPath;
          if (picPath.startsWith("public/")) {
            // If path already includes "public/", use it as-is relative to cwd
            fullPath = path.join(process.cwd(), picPath);
          } else {
            // If path is relative to public folder, prepend "public"
            fullPath = path.join(process.cwd(), "public", picPath);
          }
          
          console.log("Checking path:", fullPath);
          console.log("File exists:", fs.existsSync(fullPath));
          
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log("✅ Image file deleted:", fullPath);
          } else {
            console.log("❌ File not found:", fullPath);
          }
        });
      } catch (fileErr) {
        console.log("Error deleting image files:", fileErr.message);
        // Don't return here - continue with record deletion
      }
    }
    
    // Delete the database record
    await Product.findByIdAndDelete(req.params._id);
    
    res.send({result:"Done", message:"Record is Deleted"});
    
  } catch (error) {
    console.log("Delete error:", error);
    res.status(500).send({result:"Fail", reason:"Internal Server Error"});
  }
}

// async function deleteRecord(req, res) {
//   try {
//     const data = await Product.findById(req.params._id);

//     if (!data) {
//       return res.send({
//         result: "Fail",
//         reason: "Invalid ID, No record Found",
//       });
//     }

//     const deletedData = await Product.findByIdAndDelete(req.params._id);

//     if (deletedData) {
//       try {
//         // Delete all associated image files
//         if (deletedData.pic && Array.isArray(deletedData.pic)) {
//           deletedData.pic.forEach((picPath) => {
//             const filePath = path.join(process.cwd(), "public", picPath);
//             if (fs.existsSync(filePath)) {
//               fs.unlinkSync(filePath);
//               console.log("✅ Image file deleted");
//             }
//           });
//         }
//       } catch (fileErr) {
//         console.log("Error deleting files:", fileErr.message);
//       }
//       res.send({ result: "Done", message: "Record Deleted Successfully" });
//     } else {
//       res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ result: "Fail", reason: "Internal server error" });
//   }
// }

module.exports = {
  createRecord,
  getAllRecords,
  getSingleRecord,
  updateRecord,
  deleteRecord,
};
