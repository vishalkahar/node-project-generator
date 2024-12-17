const express = require("express");

// CONTROLLERS
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
} = require("../controllers/productControllers");

// CHECK ROLE ACCORDING TO ROUTES
const checkRole = require("../middlewares/checkRole");

//  TO VALIDATE USER DATA TYPES WHILE CREATING NEW USER
const { validateProduct } = require("../middlewares/validatation");

const router = express.Router();

// Private routes (require authentication)
router.post(
  "/add_product",
  checkRole(["super_admin", "admin1"]),
  validateProduct,
  addProduct
);

router.get(
  "/",
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  getAllProducts
);

router.get(
  "/search",
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  searchProducts
);

router.get(
  "/:id",
  checkRole(["super_admin", "admin1", "admin2"]),
  getProductById
);

router.put(
  "/:id",
  checkRole(["super_admin"]),
  validateProduct,
  updateProductById
);

router.delete("/:id", checkRole(["super_admin"]), deleteProductById);

module.exports = router;
