// imports
const Meal = require("../models/mealModel");
const asyncHandler = require("express-async-handler");

// get functions
const getMeal = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const employee = await Meal.find({ empId });
  resp.status(200).json(employee);
});

// post functions
const addMeal = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const { lunch, breakfast } = req.body;

  if (lunch.length<1 && breakfast.length<1) {
    return resp.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    // First, try to find the existing meal record
    let updatedItem = await Meal.findOne({ empId });

    if (updatedItem) {
      // If the record exists, append new data to the existing arrays
      updatedItem.lunch.push(...lunch);
      updatedItem.breakfast.push(...breakfast);
      updatedItem = await updatedItem.save();

      resp.status(200).json({
        message: `Data with ID ${empId} updated successfully`,
        success: true,
        updatedItem,
      });
    } else {
      // If the record doesn't exist, create a new one
      const newMeal = await Meal.create({ empId, lunch, breakfast });
      const respData = {
        ...newMeal._doc,
        success: true,
        message: `Meal added successfully`,
      };
      resp.status(201).json(respData);
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Internal Server Error" });
  }
});

// put functions
const putMeal = asyncHandler(async (req, resp) => {
  const empId = req.params.empId;
  const updatedMealData = req.body;
  try {
    const updatedItem = await Meal.findOneAndUpdate(
      { empId },
      updatedMealData,
      {
        new: true,
      }
    );
    if (!updatedItem) {
      return resp.status(404).json({ message: "Data not found" });
    }

    resp
      .status(200)
      .json({ message: `Data with ID ${empId} updated successfully` });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Internal Server Error" });
  }

  const respData = {
    ...updatedItem._doc,
    success: true,
    message: `Meal Updated successfully`,
  };
  return resp.status(201).json(respData);
});

module.exports = {
  getMeal,
  addMeal,
  putMeal,
};
