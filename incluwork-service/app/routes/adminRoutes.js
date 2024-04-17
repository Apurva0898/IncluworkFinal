import express from 'express';
import * as adminController from '../controllers/adminController.js';
import jwtAuth from '../lib/jwtAuth.js';
import * as userController from "../controllers/usercontroller.js";


const router = express.Router();

router.get("/employers", jwtAuth, adminController.getAllEmployers);

//Route to get all users
router.get("/users", jwtAuth, userController.getAllUsers);



export default router;