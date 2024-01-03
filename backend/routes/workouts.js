
const express = require("express");
const { createWorkout,
         getWorkouts ,
         getWorkout,
         deleteWorkout,
         updateWorkout

      } = require("../controllers/workoutControllers")

  const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)
//for all workouts
router.get('/', getWorkouts)

//for single workout
router.get('/:id',getWorkout)

//post a new workout 

router.post('/',createWorkout)


router.delete('/:id',deleteWorkout)


router.patch('/:id',updateWorkout)

module.exports = router