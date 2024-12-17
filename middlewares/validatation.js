const { body, validationResult } = require("express-validator");
const { User } = require("../models");

// UITLS MODULES
const message = require("../utils/commonMessages");
const { errorResponse } = require("../utils/handleResponse");

const validateAuth = [
  body("email").isEmail().withMessage("Invalid email format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

const validateNewUser = [
  body("firstname")
    .isAlpha()
    .withMessage("Firstname must contain only letters"),
  body("lastname").isAlpha().withMessage("Lastname must contain only letters"),
  body("email")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

const validatePrevUser = [
  body("firstname")
    .isAlpha()
    .withMessage("Firstname must contain only letters"),
  body("lastname").isAlpha().withMessage("Lastname must contain only letters"),
  body("email").isEmail().withMessage("Invalid email format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

const validateRole = [
  body("name").isAlpha().withMessage("Role name must contain only letters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

const validateCategory = [
  body("category_name")
    .isString()
    .withMessage("Category name must be a string")
    .isLength({ min: 3 })
    .withMessage("Category name must not be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(
        res,
        message.AUTH.INVALID_FORMAT,
        errors.array(),
        400
      );
    }
    next();
  },
];

const validateProduct = [
  body("product_name")
    .isString()
    .withMessage("Product name must be a string")
    .isLength({ min: 1 })
    .withMessage("Product name must not be empty"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("categoryId")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateAuth,
  validateNewUser,
  validatePrevUser,
  validateRole,
  validateCategory,
  validateProduct,
};
