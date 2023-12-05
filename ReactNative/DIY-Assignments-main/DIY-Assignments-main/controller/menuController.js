// imports
const Menu = require("../models/menuModel");
const asyncHandler = require("express-async-handler");

// get functions
// const getAllMenu = asyncHandler(async (req, res) => {
//   const filterType = req.query.filterType;
//   let startDate, endDate;

//   const today = new Date();

//   switch (filterType) {
//     case "week":
//       startDate = new Date(
//         today.getFullYear(),
//         today.getMonth(),
//         today.getDate() - today.getDay()
//       ); // Start of the week
//       endDate = new Date(
//         today.getFullYear(),
//         today.getMonth(),
//         today.getDate() + (6 - today.getDay())
//       ); // End of the week
//       break;
//     case "month":
//       startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
//       endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the month
//       break;
//     case "year":
//       startDate = new Date(today.getFullYear(), 0, 1); // Start of the year
//       endDate = new Date(today.getFullYear(), 11, 31); // End of the year
//       break;
//     default:
//       startDate = new Date("2023-09-14");
//       endDate = new Date("2023-09-15");
//       break;
//   }

//   try {
//     const filteredMenu = await Menu.find({
//       date: { $gte: startDate, $lt: endDate },
//     });
//     res.json(filteredMenu);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const getAllMenu = asyncHandler(async (req, res) => {

  try {

    const allMenus = await Menu.find({});

    res.status(200).json(allMenus);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

// post functions
const addMenu = asyncHandler(async (req, res) => {
  try {
    const menus = req.body; // Assuming you're sending an array of menus in the request body

    // Attempt to insert the menus
    const result = await Menu.insertMany(menus);

    // If successful, return the result
    res.json(result);
  } catch (error) {
    // If the error is due to a duplicate key (date), handle it separately
    if (error.code === 11000 && error.keyPattern && error.keyPattern.date) {
      res.status(400).json({
        error: `Menu with date '${error.keyValue.date}' already exists.`,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// put functions
const putMenu = asyncHandler(async (req, res) => {
  const { day, mealType, dishName } = req.body;
  const dateToUpdate = req.params.date;

  try {
    // Find the menu item by date
    const menu = await Menu.findOne({ date: dateToUpdate });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Update menu properties
    menu.day = day;
    menu.mealType = mealType;
    menu.dishName = dishName;

    await menu.save();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllMenu,
  addMenu,
  putMenu,
};
