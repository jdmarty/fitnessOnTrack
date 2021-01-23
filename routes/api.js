// Import router and Workout models
const router = require("express").Router();
const Workout = require("../models/Workout");

// GET all workouts
router.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find({});
    res.status(200).json(workouts)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});




module.exports = router
