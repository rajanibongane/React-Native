const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  getAllEmployees,
  getEmployee,
} = require("../controller/employeeController");
const {
  postEmployee,
  loginUser,
  logoutUser,
} = require("../controller/loginController");

router.route("/login").post(loginUser);
// Use validateToken middleware before the route handler
router.use(validateToken);
router.route("/logout").post(logoutUser);
router.route("/").get(getAllEmployees).post(postEmployee);
router.route("/:empId").get(getEmployee);
module.exports = router;
