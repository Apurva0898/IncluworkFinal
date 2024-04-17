import express from "express";
import jwtAuth from "../lib/jwtAuth.js";
import * as jobApplicationController from "../controllers/jobApplicationController.js";

const router = express.Router();

//Route to create job application
router.post("/jobapplications",jwtAuth, jobApplicationController.createjobApplication);
router.get("/jobapplications",jwtAuth, jobApplicationController.getJobApplications);


export default router;