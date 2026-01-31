const Testimonial = require("../models/Testimonial");
const fs = require("fs");
const path = require("path");

async function createRecord(req, res) {
  try {
    const data = new Testimonial(req.body);
    if (req.file) {
      data.pic = req.file.path.replace(/^public[\\/]/, "").replace(/\\/g, "/");
    }
    await data.save();
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
    error.errors?.pic
      ? errorMessage.push({ pic: error.errors.pic.message })
      : "";
    error.errors?.message
      ? errorMessage.push({ message: error.errors.message.message })
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
    const data = await Testimonial.find().sort({ _id: -1 });
    res.send({ result: "Done", count: data.length, data: data });
  } catch (err) {
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function getSingleRecord(req, res) {
  try {
    // const data = await Testimonial.findOne().sort({_id:req.params._id});
    const data = await Testimonial.findById(req.params._id);

    if (data) res.send({ result: "Done", data: data });
    else res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function updateRecord(req, res) {
  try {
    // const data = await Testimonial.findOne().sort({_id:req.params._id});
    const data = await Testimonial.findById(req.params._id);
    if (!data) {
      return res.send({
        result: "Fail",
        reason: "Invalid ID, No record Found",
      });
    }
    data.name = req.body.name ?? data.name;
    data.active = req.body.active ?? data.active;

    if (req.file) {
      try {
        // ✅ Build correct actual file path
        const oldFilePath = path.join(process.cwd(), "public", data.pic);

        console.log("Deleting:", oldFilePath);

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log("✅ Old file deleted");
        } else {
          console.log("❌ File not found:", oldFilePath);
        }
      } catch (err) {
        console.log("Delete error:", err.message);
      }

      // ✅ Save new file path clean (no public)
      data.pic = req.file.path.replace(/^public[\\/]/, "").replace(/\\/g, "/");
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
    const data = await Testimonial.findById(req.params._id);
    
    if (!data) {
      return res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
    }
    
    const filePath = path.join(process.cwd(), "public", data.pic);
    
    const deletedData = await Testimonial.findByIdAndDelete(req.params._id);
    
    if (deletedData) {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("✅ Image file deleted");
        }
      } catch (fileErr) {
        console.log("Error deleting file:", fileErr.message);
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
