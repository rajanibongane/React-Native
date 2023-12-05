// imports
const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors"); // Add this line
const authenticateUser = require("./middleware/authenticateUser");
const app = express();
const port = process.env.PORT || 7000;
connectDb();
app.use(cors());
//passer for getting data from client to serverside
app.use(express.json());

// setting Routes

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/meal", require("./routes/mealRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));

// localhost API lisner
app.listen(port, () => {
  console.log("port=", port);
});
