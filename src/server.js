require("express-async-errors");
require("dotenv/config");

const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = 3333;
app.listen(3333, console.log(`Server is running port ${PORT}`));
