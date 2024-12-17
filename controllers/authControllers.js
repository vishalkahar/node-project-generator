const dotenv = require("dotenv");

// USER MODEL
const { User } = require("../models");

// CORE-CONFIG MODULES
const generateToken = require("../core-configurations/jwt-config/generateToken");
const logger = require("../core-configurations/logger-config/logger");
const Bugsnag = require("../core-configurations/bugsnag-config/bugsnagConfig");

// UTILS MODULES
const { successResponse, errorResponse } = require("../utils/handleResponse");
const message = require("../utils/commonMessages");

// MIDDLEWARE
const { addToBlacklist } = require("../middlewares/blackListToken");

dotenv.config();

const generateAuthUserLogin = async (req, res) => {
  try {
    logger.info("authControllers --> generateAuthUserLogin --> reached");

    const { email } = req.body;
    const responseData = await User.findOne({ where: { email } });

    if (!responseData) {
      Bugsnag.notify(message.AUTH.INVALID_USER);
      return errorResponse(res, message.AUTH.INVALID_USER, null, 404);
    }

    // GENERATE TOKEN
    const tokenData = generateToken(responseData.id);

    logger.info("authControllers --> generateAuthUserLogin --> ended");
    return successResponse(res, message.AUTH.VERIFIED_USER, tokenData, 200);
  } catch (error) {
    logger.error("authControllers --> generateAuthUserLogin --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

const generateAuthUserLogout = (req, res) => {
  try {
    logger.info("authControllers --> generateAuthUserLogout --> reached");

    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return errorResponse(res, message.AUTH.UNAUTHORIZED_TOKEN, null, 401);
    }

    addToBlacklist(token);

    logger.info("authControllers --> generateAuthUserLogout --> ended");
    return successResponse(res, message.AUTH.LOGOUT, null, 200);
  } catch (error) {
    logger.error("authControllers --> generateAuthUserLogout --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

module.exports = { generateAuthUserLogin, generateAuthUserLogout };
