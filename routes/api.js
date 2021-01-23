// Import router and Workout models
const router = require("express").Router();
const Workout = require("../models/Workout");

// GET all workouts
router.get("/api/workouts", async (req, res) => {
  try {
    // find and send all workouts
    const workouts = await Workout.find({});
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// POST new workout
router.post("/api/workouts", async (req, res) => {
  try {
    // create a new workout from the body data
    const newWorkout = await Workout.create(req.body);
    res.status(200).json(newWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
