const express = require("express");

// CONTROLLERS
const {
  uploadAndIntegrateFile,
} = require("../controllers/uploadFileControllers");

// VERIFY TOKEN FOR EACH ROUTES
const { verifyToken } = require("../middlewares/verifyToken");

// UPLOAD FUNCTIONALITY
const upload = require("../middlewares/uploadFile");

const router = express.Router();

// Private routes (require authentication) --- (here we are passing array of files with max count is 5)
router.post("/upload-file", upload.array("files", 5), uploadAndIntegrateFile);

module.exports = router;
