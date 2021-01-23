// function to start the workout page
async function initWorkout() {
  // get the last workout
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  // if there is a last workout...
  if (lastWorkout) {
    // set the link to navigate to the last workout page
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);
    // create an object to summarize the workout
    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: lastWorkout.totalDuration,
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };
    // render that summary to the DOM
    renderWorkoutSummary(workoutSummary);
  // If there is not, render a no workout DOM
  } else {
    renderNoWorkoutText()
  }
}

// function to summarize all exercise data
function tallyExercises(exercises) {
  // reduce exercises into an object
  const tallied = exercises.reduce((acc, curr) => {
    // for resistance exercises, add weight, sets, and reps to accumulator
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    // for cardio exercises, add distance to the accumulator
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  // return the summary object
  return tallied;
}

// function to create a formatted current date
function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  // return the current data
  return new Date(date).toLocaleDateString(options);
}

// function to render a summary of the current workout to the DOM
function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");
  // Headers for DOM elements
  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };
  // Update DOM with summary data
  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

// function to render no workout page
function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

// initiate workout page
initWorkout();
