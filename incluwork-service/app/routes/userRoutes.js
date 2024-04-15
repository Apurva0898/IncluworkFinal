import express from "express";
import * as userController from "../controllers/usercontroller.js";
import jwtAuth from "../lib/jwtAuth.js";


const router = express.Router();

//Route to get all users
router.get("/users", jwtAuth, userController.getAllUsers);

// Routes for job seeker profile
// Route to get all job seekers
router.get('/jobseekers',jwtAuth, userController.getJobSeekerProfile);

// Route to update a job seeker's profile
router.patch('/jobseekers',jwtAuth, userController.updateJobSeeker);

// Route to delete a job seeker
router.delete('/jobseekers',jwtAuth, userController.deleteJobSeeker);



export default router;