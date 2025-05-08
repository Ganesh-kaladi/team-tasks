const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

function sendJwtToken(id, statusCode, empName, res) {
  const data = {
    userId: id,
  };
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  });

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: "none",
  //   // path: "/",
  //   maxAge: 24 * 60 * 60 * 1000,
  // });
  res.status(statusCode).json({ status: "success", token, empName });
}

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return res.status(401).json({ message: "user is not registered." });
  }
  sendJwtToken(user._id, 200, user.empName, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

exports.authentication = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("user must be login for this action"));
  }
  const token = req.headers.authorization.split(" ");
  if (!(token[0] === "Bearer")) {
    return next(new AppError("user must be login", 401));
  }
  const decode = await jwt.verify(token[1], process.env.JWT_SECRET);
  const user = await User.findById(decode.userId);
  if (!user) {
    return next(new AppError("unauthorization persons are not allowed", 401));
  }
  req.user = user;
  next();
});

exports.authorization = (roles) => {
  return (req, res, next) => {
    if (!(req.user.role === roles)) {
      return next(new AppError("unauthorized persons not allowed.", 401));
    }
    next();
  };
};

exports.getMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id).populate({
    path: "receviedTasks",
    select: "title description dueDate priority status assignByName assignByID",
  });
  if (!user) {
    return next(new AppError("user is not register", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
