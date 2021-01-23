init();

async function init() {
  // if there are note any search parameters in the url
  if (location.search.split("=")[1] === undefined) {
    // get the last workout
    const workout = await API.getLastWorkout();
    // if a workout is retrieved, navigate to the page for that workout
    if (workout) {
      location.search = "?id=" + workout._id;
    // otherwise, hide the continue button
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

