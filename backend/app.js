const express = require("express");

var cors = require("cors");

const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute");
const authRoutes = require("./routes/authRoutes");
const globalError = require("./controller/errorController");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", authRoutes);
app.use(globalError);

module.exports = app;
