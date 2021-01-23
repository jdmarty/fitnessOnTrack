// Import router and Workout models
const router = require("express").Router();
const { Workout } = require("../models");

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

// GET one workout
// router.get("/api/workouts/:id", async (req, res) => {
//   try {
//     // find and send all workouts
//     const workouts = await Workout.find({ _id: req.params.id });
//     res.status(200).json(workouts);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// GET last seven workouts
router.get("/api/workouts/range", async (req, res) => {
  try {
    // find all workouts, sort by date descending, and limit 7 results
    const workouts = await Workout.find()
    .sort({ day: -1})
    .limit(7);
    // return found results
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

// PUT add an exercise to a workout
router.put("/api/workouts/:id", async (req, res) => {
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
