const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Employee"],
    default: "Employee",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
