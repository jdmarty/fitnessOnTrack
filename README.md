# Fitness on Track

## Links
Deployed: [https://fitness-on-track.herokuapp.com/](https://fitness-on-track.herokuapp.com/)
Repository: [https://github.com/jdmarty/fitnessOnTrack](https://github.com/jdmarty/fitnessOnTrack)

## Description
This is a simple exercise tracking app built with MongoDB and express that allows the user to track their daily workouts and maintain a dashboard which describes their workout type, duration, and weight, including tracking multiple workouts per day.

## How To Use
### Home Page
When a user navigates to the homepage, they will be presented with a summary of their most recent workout and the option to either continue that workout or start a new one. Select "Continue Workout" to add more exercises to the most recent workout, or select "New Workout" to start a new exercise set.

### Adding Exercises
After selecting to start or continue a workout, the user will be asked to select an exercise type (resistance or cardio) and input data about their exercise. To add an exercise
1. Select an exercise type from the drop down menu.
2. Enter an exercise name.
3. Fill out the remaining fields for that exercise type.
4. Once all fields are filled, the buttons to complete the workout or add that exercise will be activated. Click "Complete" to finish the workout and navigate to the home page or "Add Exercise" to remain on this page and continue adding exercises to this workout

### Dashboard
A user can navigate to the dashboard to see a graphical representation of their past seven workouts, including a line chart showing workout time in minutes, a bar chart of total weight per workout, and a set of pie charts detailing how much time was spent on each exercise type.

## License
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
This project uses the ISC license