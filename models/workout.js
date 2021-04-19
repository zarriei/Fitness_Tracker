  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
        {
          type: {
            type: String,
            trim: true,
            required: true
          },
          name: {
            type: String,
            trim: true,
            required: true
          },
          duration: {
            type: Number,
            required: true
          },
          weight: {
            type: Number
          },
          reps: {
            type: Number
          },
          sets: {
            type: Number
          },
          distance: {
            type: Number
          }
      }
    ]
  },{
  toJSON: {
    virtuals: true
  }
  });

// This adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function () {
  // This will "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});
  
  const Workout = mongoose.model("workout", WorkoutSchema);
  
  module.exports = Workout;