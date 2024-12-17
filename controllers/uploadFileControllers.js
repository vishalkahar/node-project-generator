// FILE MODEL
const { File } = require("../models");

// CORE-CONFIG
const logger = require("../core-configurations/logger-config/logger");
const Bugsnag = require("../core-configurations/bugsnag-config/bugsnagConfig");

// UTILS
const { successResponse, errorResponse } = require("../utils/handleResponse");
const message = require("../utils/commonMessages");

// FUNCTIONALITY TO UPLOAD ARRAY OF FILES AND INTEGRATE THEM
const uploadAndIntegrateFile = async (req, res) => {
  try {
    logger.info("uploadFileControllers --> uploadAndIntegrateFile --> reached");

    const { id } = req.body;
    const files = req.files;

    if (files.length === 0) {
      return errorResponse(res, message.FILE.EMPTY_FILE, files, 400);
    }

    const fileDataArray = files.map((file) => ({
      userId: id,
      filename: file.filename,
      filepath: `uploads/${id}/${file.filename}`,
      mimetype: file.mimetype,
      filesize: file.size,
    }));

    const newFiles = await File.bulkCreate(fileDataArray);

    logger.info("uploadFileControllers --> uploadAndIntegrateFile --> ended");
    return successResponse(res, message.FILE.UPLOAD_SUCESS, newFiles, 201);
  } catch (error) {
    logger.error(
      "uploadFileControllers --> uploadAndIntegrateFile --> error",
      error
    );
    Bugsnag.notify(error);
    if (error.name === "SequelizeDatabaseError") {
      return errorResponse(res, message.FILE.DATA_TOO_LONG, null, 400);
    }
    return errorResponse(res, message.SERVER.INTERNAL_SERVER_ERROR, error, 500);
  }
};

module.exports = { uploadAndIntegrateFile };
