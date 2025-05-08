const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema(
  {
    empName: {
      type: String,
      required: true,
      trim: true,
    },
    empID: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: true,
      min: [8, "passowrd must be 8 charecters."],
      select: false,
    },
    designation: { type: String, required: true },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "manager", "user"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userShema.methods.checkPassword = async function (inputPassword, password) {
  const compare = await bcrypt.compare(inputPassword, password);
  return compare;
};

userShema.virtual("givenTasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "assignByID",
});

userShema.virtual("receviedTasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "assignedForID",
});
const User = mongoose.model("User", userShema);

module.exports = User;
