const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const { getMeal, addMeal, putMeal } = require("../controller/mealController");

// Use validateToken middleware before the route handler
router.use(validateToken);
router.route("/:empId").get(getMeal).post(addMeal).put(putMeal);
module.exports = router;
