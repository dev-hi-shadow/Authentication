const path = require("path");

// Load env variables
require("dotenv").config({
  path: path.join(
    __dirname,
    `../.env.${process.env.NODE_ENV || "development"}`
  ),
});
const { sequelize } = require("./config/mysql");

// Express App
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ limit: "*", extended: true }));

app.set("view engine", "ejs");

app.use(bodyParser.json());

var cors = require("cors");
app.use(cors());
const morgan = require("morgan");

app.use(morgan("dev"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send(` Authentication MySql Backend`);
});

app.use(require("./routes/index"));

app.use((err, req, res, next) => {
  const sendErrors = {
    status: 500,
    success: false,
  };
  sendErrors.errors = Array.isArray(err.errors)
    ? err.errors.map((error) => error.message)
    : err;
  res.status(err?.statusCode || 500).json(sendErrors);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL database connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(
        `Server is start listing on port: ${PORT}. Visit http://localhost:${PORT}`
      );
    });
  })
  .catch((reason) =>
    console.log("Unable to connect to the MySQL database:", reason)
  );
