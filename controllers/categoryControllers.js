// USER MODEL
const { Category } = require("../models");

// CORE CONFIG
const logger = require("../core-configurations/logger-config/logger");
const Bugsnag = require("../core-configurations/bugsnag-config/bugsnagConfig");

// UTILS
const { successResponse, errorResponse } = require("../utils/handleResponse");
const message = require("../utils/commonMessages");

// ADD NEW CATEGORY
const addCategory = async (req, res) => {
  try {
    logger.info("categoryControllers --> addCategory --> reached");
    const { category_name } = req.body;

    const responseData = await Category.create({
      category_name,
    });

    logger.info("categoryControllers --> addCategory --> ended");
    return successResponse(
      res,
      message.CATEGORY.CREATE_SUCCESS,
      responseData,
      201
    );
  } catch (error) {
    logger.error("categoryControllers --> addCategory --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET ALL LIST OF CATEGORIES
const getAllCategoryList = async (req, res) => {
  try {
    logger.info("categoryControllers --> getAllCategoryList --> reached");
    const responseData = await Category.findAll();

    logger.info("categoryControllers --> getAllCategoryList --> ended");
    return successResponse(
      res,
      message.CATEGORY.LIST_FETCH_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("categoryControllers --> getAllCategoryList --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
  logger.info("categoryControllers --> getCategoryById --> reached");
  const { id } = req.params;
  try {
    const responseData = await Category.findByPk(id);

    if (!responseData) {
      Bugsnag.notify(message.CATEGORY.CATEGORY_NOT_FOUND);
      return errorResponse(res, message.CATEGORY.CATEGORY_NOT_FOUND, null, 404);
    }

    logger.info("categoryControllers --> getCategoryById --> ended");

    return successResponse(
      res,
      message.CATEGORY.FETCH_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("categoryControllers --> getCategoryById --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// UPDATE CATEGORY BY ID
const updateCategoryById = async (req, res) => {
  logger.info("categoryControllers --> updateCategoryById --> reached");
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const responseData = await Category.findByPk(id);

    if (!responseData) {
      Bugsnag.notify(message.CATEGORY.CATEGORY_NOT_FOUND);
      return errorResponse(res, message.CATEGORY.CATEGORY_NOT_FOUND, null, 404);
    }

    responseData.category_name = category_name;

    await responseData.save();

    logger.info("categoryControllers --> updateCategoryById --> ended");
    return successResponse(
      res,
      message.CATEGORY.UPDATE_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("categoryControllers --> updateCategoryById --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// DELETE CATEGORY BY ID
const deleteCategoryById = async (req, res) => {
  logger.info("categoryControllers --> deleteCategoryById --> reached");
  const { id } = req.params;
  try {
    const responseData = await Category.findByPk(id);

    if (!responseData) {
      Bugsnag.notify(message.CATEGORY.CATEGORY_NOT_FOUND);
      return errorResponse(res, message.CATEGORY.CATEGORY_NOT_FOUND, null, 404);
    }

    await responseData.destroy();

    logger.info("categoryControllers --> deleteCategoryById --> ended");
    return successResponse(
      res,
      message.CATEGORY.DELETE_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("categoryControllers --> deleteCategoryById --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

module.exports = {
  addCategory,
  getAllCategoryList,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
