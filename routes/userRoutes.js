const express = require("express");

// CONTROLLERS
const {
  getAllUserList,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userControllers");

// CHECK ROLE ACCORDING TO ROUTES
const checkRole = require("../middlewares/checkRole");

//  TO VALIDATE USER DATA TYPES WHILE CREATING NEW USER
const {
  validateNewUser,
  validatePrevUser,
} = require("../middlewares/validatation");

const router = express.Router();

// Private routes (require authentication)
router.post(
  "/add_user",
  checkRole(["super_admin", "admin1"]),
  validateNewUser,
  createUser
);

router.get(
  "/",
  checkRole(["super_admin", "admin1", "admin2", "super_agent"]),
  getAllUserList
);

router.get("/:id", checkRole(["super_admin", "admin1", "admin2"]), getUserById);

router.put("/:id", checkRole(["super_admin"]), validatePrevUser, updateUser);

router.delete("/:id", checkRole(["super_admin"]), deleteUser);

module.exports = router;
