const API = {
  async getLastWorkout() {
    let res;
    try {
      // call api/workouts, which will return all workouts
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    //return the last item in the response array
    return json[json.length - 1];
  },
  async addExercise(data) {
    // pull the id of this workout out of the url
    const id = location.search.split("=")[1];
    // make a put request to the api for that id to update a workout
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    // return the json response
    return json;
  },
  async createWorkout(data = {}) {
    // post a new workout to the api
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    // return the json response
    return json;
  },

  async getWorkoutsInRange() {
    // call all workouts in a specific range
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    // return the json response
    return json;
  },
};
