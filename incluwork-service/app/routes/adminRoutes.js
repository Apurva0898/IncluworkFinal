import express from 'express';
import * as adminController from '../controllers/adminController.js';
import jwtAuth from '../lib/jwtAuth.js';
import * as userController from "../controllers/userController.js";


const router = express.Router();

router.get("/employers", jwtAuth, adminController.getAllEmployers);

//Route to get all users
router.get("/users", jwtAuth, userController.getAllUsers);

router.get('/jobs', jwtAuth,adminController.getAllJobs);



export default router;