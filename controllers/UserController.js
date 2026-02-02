const User = require("../models/User");
const fs = require("fs");
const path = require("path");

async function createRecord(req, res) {
  try {
    const data = new User(req.body);
    data.role = "Buyer"
    await data.save();
    res.send({
      result: "Done",
      data: data,
      message: "Record Created Successfully",
    });
  } catch (error) {
    console.log(error);
    const errorMessage = [];
    error.errors?.keyValue?.username
      ? errorMessage.push({ name: "User Name Already Exists" })
      : "",
    error.errors?.keyValue?.email
      ? errorMessage.push({ email: "Email Already Exists" })
      : "",
      error.errors?.name
        ? errorMessage.push({ name: error.errors.name.message })
        : "";
    error.errors?.username
      ? errorMessage.push({ username: error.errors.username.message })
      : "";
    error.errors?.email
      ? errorMessage.push({ email: error.errors.email.message })
      : "";
    error.errors?.phone
      ? errorMessage.push({ phone: error.errors.phone.message })
      : "";
    error.errors?.password
      ? errorMessage.push({ password: error.errors.password.message })
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
    const data = await User.find().sort({ _id: -1 });
    res.send({ result: "Done", count: data.length, data: data });
  } catch (err) {
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function getSingleRecord(req, res) {
  try {
    // const data = await User.findOne().sort({_id:req.params._id});
    const data = await User.findById(req.params._id);

    if (data) res.send({ result: "Done", data: data });
    else res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: "Fail", reason: "Internal server error" });
  }
}

async function updateRecord(req, res) {
  try {
    // const data = await User.findOne().sort({_id:req.params._id});
    const data = await User.findById(req.params._id);
    if (!data) {
      return res.send({
        result: "Fail",
        reason: "Invalid ID, No record Found",
      });
    }
    data.name = req.body.name ?? data.name;
    data.phone = req.body.phone ?? data.phone;
    data.address = req.body.address ?? data.address;
    data.pin = req.body.pin ?? data.pin;
    data.city = req.body.city ?? data.city;
    data.state = req.body.state ?? data.state;
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
    res.send({ result: "Done", data:data, message: "Recor Updated Successfully" });
  } catch (error) {
    console.log(error);
    const errorMessage = [];
    error.errors?.keyValue?.name
      ? errorMessage.push({ name: "User Already Exists" })
      : "",
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
    const data = await User.findById(req.params._id);
    
    if (!data) {
      return res.send({ result: "Fail", reason: "Invalid ID, No record Found" });
    }
    
    const filePath = path.join(process.cwd(), "public", data.pic);
    
    const deletedData = await User.findByIdAndDelete(req.params._id);
    
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
