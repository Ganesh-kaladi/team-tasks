const express = require("express");

const {
  login,
  logout,
  getMe,
  authentication,
} = require("../controller/authController");

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/get-me", authentication, getMe);

module.exports = router;
