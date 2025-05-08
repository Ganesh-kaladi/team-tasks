const express = require("express");
const multer = require("multer");

const upload = multer();

const {
  getAllTask,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getTaskOfUser,
  getTaskOfEmployee,
} = require("../controller/taskController");

const {
  authentication,
  authorization,
} = require("../controller/authController");

const router = express.Router();

router.get("/get-tasks", authentication, getTaskOfUser);
router.get("/get-tasks/:id", authentication, getTaskOfEmployee);

router
  .route("/")
  .get(authentication, getAllTask)
  .post(upload.none(), authentication, createTask);

router
  .route("/:id")
  .get(authentication, getTask)
  .patch(authentication, authorization("admin"), updateTask)
  .delete(authentication, authorization("admin"), deleteTask);

module.exports = router;
