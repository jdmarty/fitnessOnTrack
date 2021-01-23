// Import router and Workout models
const router = require("express").Router();
const { Workout } = require("../models");

// GET all workouts
router.get("/workouts", async (req, res) => {
  try {
    // find and aggregate workouts to add total duration
    const workouts = await Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } }
      },
    ]);
    // send the aggregated workout
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// GET last seven workouts
router.get("/workouts/range", async (req, res) => {
  try {
    // find all workouts, sort by date descending, and limit 7 results
    const workouts = await Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ])
      .sort({ day: -1 })
      .limit(7);
    // return found results
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// POST new workout
router.post("/workouts", async (req, res) => {
  try {
    // create a new workout from the body data
    const newWorkout = await Workout.create(req.body);
    res.status(200).json(newWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT add an exercise to a workout
router.put("/workouts/:id", async (req, res) => {
  try {
    // find and update a workout by workout
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    );
    // respond with the updated workout
    res.status(200).json(updatedWorkout);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
