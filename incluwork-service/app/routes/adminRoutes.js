import express from 'express';
import * as adminController from '../controllers/adminController.js';
import jwtAuth from '../lib/jwtAuth.js';
import * as userController from "../controllers/userController.js";
import * as jobController from '../controllers/jobController.js';


const router = express.Router();

router.get("/admin/employers", jwtAuth, adminController.getAllEmployers);

//Route to get all users
router.get("/admin/users", jwtAuth, userController.getAllUsers);

router.get('/admin/jobs', jwtAuth,adminController.getAllJobs);
router.get('/admin/applications', jwtAuth,adminController.getAllApplications);




export default router;