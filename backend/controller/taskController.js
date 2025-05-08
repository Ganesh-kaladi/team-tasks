const Task = require("../model/taskModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTask = catchAsync(async (req, res, next) => {
  const task = await Task.find();
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    dueDate,
    priority,
    assignedForName,
    assignedForID,
  } = req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    assignedForName,
    assignedForID,
    assignByID: req.user._id,
    assignByName: req.user.empName,
  });
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});

exports.getTaskOfUser = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ assignedForID: req.user._id })
    .sort("-dueDate")
    .select("-assignByName")
    .populate({
      path: "assignByID",
      select: "empName designation",
    });
  if (!tasks) {
    return next(new AppError("tasks are not assigned to this user"));
  }
  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

exports.getTaskOfEmployee = catchAsync(async (req, res, next) => {
  console.log(req.query);
  let query = Task.find({ assignedForID: req.params.id });

  if (req.query.status) {
    const statusQuery = req.query.status;
    query = query.where({ status: statusQuery });
  }

  const tasks = await query.select("-assignByName").sort("-dueDate").populate({
    path: "assignByID",
    select: "empName designation",
  });

  if (!tasks) {
    return next(new AppError("tasks are not assigned to this user"));
  }
  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});
