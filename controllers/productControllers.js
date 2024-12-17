const { Op } = require("sequelize");

// USER MODEL
const { Product } = require("../models");

// CORE CONFIG
const logger = require("../core-configurations/logger-config/logger");
const Bugsnag = require("../core-configurations/bugsnag-config/bugsnagConfig");

// UTILS
const { successResponse, errorResponse } = require("../utils/handleResponse");
const message = require("../utils/commonMessages");

// ADD NEW CATEGORY
const addProduct = async (req, res) => {
  try {
    logger.info("productControllers --> addProduct --> reached");
    const { product_name, description, price, categoryId } = req.body;

    const responseData = await Product.create({
      product_name,
      description,
      price,
      categoryId,
    });

    logger.info("productControllers --> addProduct --> ended");
    return successResponse(
      res,
      message.PRODUCT.CREATE_SUCCESS,
      responseData,
      201
    );
  } catch (error) {
    logger.error("productControllers --> addProduct --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET ALL LIST OF PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    logger.info("productControllers --> getAllProducts --> reached");
    const responseData = await Product.findAll();

    logger.info("productControllers --> getAllProducts --> ended");
    return successResponse(
      res,
      message.PRODUCT.LIST_FETCH_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("productControllers --> getAllProducts --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  logger.info("productControllers --> getProductById --> reached");
  const { id } = req.params;
  try {
    const responseData = await Product.findByPk(id);

    if (!responseData) {
      Bugsnag.notify(message.PRODUCT.PRODUCT_NOT_FOUND);
      return errorResponse(res, message.PRODUCT.PRODUCT_NOT_FOUND, null, 404);
    }

    logger.info("productControllers --> getProductById --> ended");

    return successResponse(
      res,
      message.PRODUCT.FETCH_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("productControllers --> getProductById --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// UPDATE PRODUCT BY ID
const updateProductById = async (req, res) => {
  logger.info("productControllers --> updateProductById --> reached");
  const { id } = req.params;
  const { product_name, description, price, categoryId } = req.body;
  try {
    const responseData = await Product.findByPk(id);

    if (!responseData) {
      Bugsnag.notify(message.PRODUCT.PRODUCT_NOT_FOUND);
      return errorResponse(res, message.PRODUCT.PRODUCT_NOT_FOUND, null, 404);
    }

    responseData.product_name = product_name;
    responseData.description = description;
    responseData.price = price;
    responseData.categoryId = categoryId;

    await responseData.save();

    logger.info("productControllers --> updateProductById --> ended");
    return successResponse(
      res,
      message.PRODUCT.UPDATE_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("productControllers --> updateProductById --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// DELETE PRODUCT BY ID
const deleteProductById = async (req, res) => {
  logger.info("productControllers --> deleteProductById --> reached");
  const { id } = req.params;
  try {
    const responseData = await Product.findByPk(id);

    if (!responseData) {
      Bugsnag.notify(message.PRODUCT.PRODUCT_NOT_FOUND);
      return errorResponse(res, message.PRODUCT.PRODUCT_NOT_FOUND, null, 404);
    }

    await responseData.destroy();

    logger.info("productControllers --> deleteProductById --> ended");
    return successResponse(
      res,
      message.PRODUCT.DELETE_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("productControllers --> deleteProductById --> error", error);
    Bugsnag.notify(error);
    return errorResponse(
      res,
      message.SERVER.INTERNAL_SERVER_ERROR,
      error.message,
      500
    );
  }
};

// SEARCH PRODUCTS
const searchProducts = async (req, res) => {
  logger.info("productControllers --> searchProducts --> reached");
  const { query } = req.query;

  try {
    const responseData = await Product.findAll({
      where: {
        product_name: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    if (responseData.length === 0) {
      Bugsnag.notify(message.PRODUCT.PRODUCT_NOT_FOUND);
      return errorResponse(res, message.PRODUCT.PRODUCT_NOT_FOUND, null, 404);
    }

    logger.info("productControllers --> searchProducts --> ended");
    return successResponse(
      res,
      message.PRODUCT.FETCH_SUCCESS,
      responseData,
      200
    );
  } catch (error) {
    logger.error("productControllers --> searchProducts --> error", error);
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
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
};
