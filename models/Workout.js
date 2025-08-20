const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  duration: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);
