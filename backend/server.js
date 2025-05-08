const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./backend/config.env" });

const url = process.env.DB_URL;
const password = process.env.DB_PASSWORD;

const DB = url.replace("<db_password>", password);

mongoose
  .connect(DB, {
    ssl: true,
  })
  .then(() => {
    console.log("DB connected..");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`server created at ${PORT}`);
});
