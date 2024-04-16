import express from "express";
import jwtAuth from "../lib/jwtAuth.js";
import {updateJob,deleteJob} from "../controllers/jobController.js";



const router = express.Router();


router.patch("/joblistings/:id", jwtAuth, updateJob);
router.delete("/joblistings/:id", jwtAuth, deleteJob);


export default router;