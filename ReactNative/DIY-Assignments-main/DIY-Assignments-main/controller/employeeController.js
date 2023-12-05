// imports
const Employee = require("../models/employeeModel");

const asyncHandler = require("express-async-handler");

// get functions
const getAllEmployees = asyncHandler(async (req, resp) => {
  const allEmployees = await Employee.find({}).populate("meal");
  resp.status(200).json(allEmployees);
});

const getEmployee = asyncHandler(async (req, res) => {
  try {
    const { empId } = req.params;
    const { month, year } = req.query;
    const employee = await Employee.findOne({ empId }).populate("meal");
    console.log("here",employee)
    // if (!employee) {
    //   return res.status(404).json({ error: "Employee not found" });
    // }
    if (month && year) {
      employee.meal.lunch = employee.meal.lunch.filter(
        (date) =>
          new Date(date).getMonth() + 1 === parseInt(month) &&
          new Date(date).getFullYear() === parseInt(year)
      );
      employee.meal.breakfast = employee.meal.breakfast.filter(
        (date) =>
          new Date(date).getMonth() + 1 === parseInt(month) &&
          new Date(date).getFullYear() === parseInt(year)
      );
    } else if (year) {
      employee.meal.lunch = employee.meal.lunch.filter(
        (date) => new Date(date).getFullYear() === parseInt(year)
      );
      employee.meal.breakfast = employee.meal.breakfast.filter(
        (date) => new Date(date).getFullYear() === parseInt(year)
      );
    }

    employee.meal.lunchCount =employee.meal? employee.meal.lunch?.length:0;
    employee.meal.breakfastCount =employee.meal? employee.meal.breakfast?.length:0;
    employee.meal.totalCost = employee.meal ? employee.meal.lunch?.length * 60 + employee.meal?.breakfast?.length * 20:0;

    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getAllEmployees,
  getEmployee,
};
