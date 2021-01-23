const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        required: "Enter a type for this workout"
      },
      name: {
        type: String,
        required: "Enter a name for this workout"
      },
      duration: {
        type: Number,
        required: "Enter a duration for this workout"
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      }
    }
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
