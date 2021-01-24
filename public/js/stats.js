// function to generate a color pallete
function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];
  // return the color pallet
  return arr;
}

// function to populate a chart with data
function populateChart(data) {
  // pull the durations, pounds, and workouts out of the API data
  let durations = data.map(({ totalDuration }) => totalDuration);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  // calculate durations and weight totals for each exercise
  let durationPerExercise = calculateDurationPerExercise(data, workouts);
  let weightPerExercise = calculateWeightPerExercise(data, workouts);
  // set the color pallet
  const colors = generatePalette();
  // target graph DOM elements
  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");
  // labels for days of week
  const daysOfWeek = [
    "Sun ",
    "Mon ",
    "Tues ",
    "Wed ",
    "Thurs ",
    "Fri ",
    "Sat ",
  ];
  // create labels from the date of each workout
  const labels = data.map(({ day }) => {
    const date = new Date(day);
    //parse the hour of the workout date
    const hourTag = date => {
      let hour = date.getHours();
      if (hour === 0) return '12AM'
      if (hour === 12) return '12PM'
      if (hour > 12) return (hour-12) +'PM'
      return hour+'AM'
    }
    return daysOfWeek[date.getDay()] + hourTag(date);
  });
  // Generate new line chart with the parsed data
  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          // total durations data set
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });
  // Generate new bar chart with the parsed data
  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  // Generate new pie chart with the parsed data
  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          // total duration for each exercise dataset
          data: durationPerExercise,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercise Durations (min)",
      },
    },
  });
  // Generate new donut chart with parsed data
  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          // total weight for each exercise dataset
          data: weightPerExercise,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercise Weights (lbs)",
      },
    },
  });
}
// function to sum the weight of all exercises in each workout
function calculateTotalWeight(data) {
  let totals = [];
  // for every workout...
  data.forEach((workout) => {
    // sum the weight of all exercise
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      // if it is a resistance exercise add the weight to the total
      if (type === "resistance") {
        return total + weight;
        // otherwise return the same total
      } else {
        return total;
      }
    }, 0);
    // push the total weight the the totals array
    totals.push(workoutTotal);
  });
  // return totals array
  return totals;
}

// function to sum the durations of each exercise type
function calculateDurationPerExercise(data, exercises) {
  let exerciseDurations = [];
  // for each exercise type...
  exercises.forEach((exercise) => {
    // map the total data set
    const exerciseDuration = data
      .map((workout) => {
        // reduce the exercises array down to just matching exercise durations
        return workout.exercises.reduce((total, current) => {
          if (current.name === exercise) {
            return total + current.duration;
          } else {
            return total;
          }
        }, 0);
      })
      // then sum up that array
      .reduce((a, b) => a + b);
    exerciseDurations.push(exerciseDuration);
  });
  return exerciseDurations;
}

// function to sum the total weight of each exercise type
function calculateWeightPerExercise(data, exercises) {
  let exerciseWeights = [];
  // for each exercise type...
  exercises.forEach((exercise) => {
    // map the total data set
    const exerciseWeight = data
      .map((workout) => {
        // reduce the exercises array down to just matching exercise weights
        return workout.exercises.reduce((total, current) => {
          if (current.name === exercise) {
            if (current.weight) return total + current.weight;
            return total
          } else {
            return total;
          }
        }, 0);
      })
      // then sum up that array
      .reduce((a, b) => a + b);
    exerciseWeights.push(exerciseWeight);
  });
  return exerciseWeights;
}

// function to pull workout names out argument data
function workoutNames(data) {
  let workouts = [];
  // for each workout
  data.forEach((workout) => {
    // push the name of each exercise to the array
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });
  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
