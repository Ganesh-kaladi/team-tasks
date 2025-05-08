const express = require("express");

const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");

const {
  authentication,
  authorization,
} = require("../controller/authController");

const router = express.Router();

router
  .route("/")
  .get(authentication, getAllUsers)
  .post(authentication, authorization("admin"), createUser);

router
  .route("/:id")
  .get(authentication, getUser)
  .patch(authentication, authorization("admin"), updateUser)
  .delete(authentication, authorization("admin"), deleteUser);

module.exports = router;
