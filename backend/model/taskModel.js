const mongoose = require("mongoose");

const taskShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    assignByID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignByName: {
      type: String,
      required: true,
    },
    assignedForID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedForName: {
      type: String,
      required: true,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Task = mongoose.model("Task", taskShema);

module.exports = Task;
