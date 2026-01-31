const multer = require("multer");
const path = require("path");

function createUploader(folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, `public/uploads/${folderName}`); //  cb(null, `public/uploads/brands}`)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.fieldname + path.extname(file.originalname));;
    },
  });

  return multer({ storage: storage });
}

module.exports = {
    brandUploder : createUploader("brands"),
    productUploder : createUploader("products"),
    testimonialUploder : createUploader("testimonials")
}