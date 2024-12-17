const express = require("express");

// CONTROLLERS
const {
  generateAuthUserLogin,
  generateAuthUserLogout,
} = require("../controllers/authControllers");

// MIDDLEWARE MODULE
const { validateAuth } = require("../middlewares/validatation");

const router = express.Router();

router.post("/login", validateAuth, generateAuthUserLogin);
router.post("/logout", generateAuthUserLogout);

module.exports = router;
