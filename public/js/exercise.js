// DOM Elements
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

// globals
let workoutType = null;
let shouldNavigateAway = false;

// function to start an exercise
async function initExercise() {
  let workout;
  // check if there is a workout id in the url parameters
  if (location.search.split("=")[1] === undefined) {
    // if not, create a new empty workout
    workout = await API.createWorkout()
    console.log(workout)
  }
  // if a new workout was created, navigate to that workout
  if (workout) {
    location.search = "?id=" + workout._id;
  }
}

initExercise();

// function to change the type of an existing workout
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;
  // Show the cardio forms
  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  // Show the resistance forms
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  // Hide the cardio and resistance forms
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }
  // validate that all inputs are valid
  validateInputs();
}

// functions to validate the name of a workout
function validateInputs() {
  let isValid = true;
  // For resistance workouts...
  if (workoutType === "resistance") {
    // check if the name input field is empty
    if (nameInput.value.trim() === "") {
      isValid = false;
    }
    // check if the weight input field is empty
    if (weightInput.value.trim() === "") {
      isValid = false;
    }
    // check if the sets input field is empty
    if (setsInput.value.trim() === "") {
      isValid = false;
    }
    // check if the reps input field is empty
    if (repsInput.value.trim() === "") {
      isValid = false;
    }
    // check if the resistance duration input field is empty
    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  // For cardio inputs...
  } else if (workoutType === "cardio") {
    // check if the name input is empty
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }
    // check if the duration input is empty
    if (durationInput.value.trim() === "") {
      isValid = false;
    }
    // check if the distance input is empty
    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }
  // if the inputs are all valid...
  if (isValid) {
    // activate the buttons
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  // otherwise...
  } else {
    // disable the buttons
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

// function to handle a submit event on the forms
async function handleFormSubmit(event) {
  event.preventDefault();
  let workoutData = {};
  // create workout data for cardio workout
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  // create workout data for resistance workout
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }
  // call the api to add an exercise
  await API.addExercise(workoutData);
  clearInputs();
  // add a success toast
  toast.classList.add("success");
}

// function to handle the end of toast animation
function handleToastAnimationEnd() {
  // remove all classes (hide)
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

// function ro reset inputs
function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

// Immediately invoked code ==============================================
// Workout type change event handler
if (workoutTypeSelect) {
  // add the handle change event listener to that input
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
// Submit workout and navigate home event handler
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
// Submit workout handler
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}

// Toast animation handler
toast.addEventListener("animationend", handleToastAnimationEnd);

// Validation handler for all inputs (checks if inputs are valid every time data is added)
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
