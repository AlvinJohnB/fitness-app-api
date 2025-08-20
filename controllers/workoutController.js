const Workout = require("../models/Workout.js");

module.exports.addWorkout = async (req, res, next) => {
  const { name, duration } = req.body;

  if (!name || !duration) {
    return res.status(400).json({ message: "Name and duration are required" });
  }

  try {
    const workout = await Workout.create({
      userId: req.user.id,
      name,
      duration,
    });
    return res.status(201).json({ workout });
  } catch (error) {
    next(error);
  }
};

module.exports.getMyWorkOuts = async (req, res, next) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    return res.status(200).json({ workouts });
  } catch (error) {
    next(error);
  }
};

module.exports.updateWorkout = async (req, res, next) => {
  const { name, duration } = req.body;

  if (!name || !duration) {
    return res.status(400).json({ message: "Name and duration are required" });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        name,
        duration,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json({ message: "Updated workout", workout });
  } catch (error) {
    next(error);
  }
};

module.exports.completeWorkoutStatus = async (req, res, next) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        status: "completed",
      },
      {
        new: true,
      }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    return res.status(200).json({ message: "Workout completed", workout });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    next(error);
  }
};
