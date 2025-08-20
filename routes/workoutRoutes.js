const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const { verify } = require("../middlewares/authMiddleware");

router.post("/addWorkout", verify, workoutController.addWorkout);
router.get("/getMyWorkouts", verify, workoutController.getMyWorkOuts);
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);
router.patch(
  "/completeWorkoutStatus/:id",
  verify,
  workoutController.completeWorkoutStatus
);

module.exports = router;
