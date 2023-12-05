const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    required: true,
  },
  dishName: {
    type: {
      Breakfast: String,
      Lunch: String,
    },
    required: true,
  },
  date: {
    type: Date,
    required: true,
    unique: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
