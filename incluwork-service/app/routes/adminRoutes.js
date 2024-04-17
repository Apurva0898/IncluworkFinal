import express from 'express';
import * as employerController from '../controllers/adminController.js';
import jwtAuth from '../lib/jwtAuth.js';


const router = express.Router();

router.get("/admin", jwtAuth, employerController.getAllEmployers);


export default router;