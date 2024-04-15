import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import jwtAuth from "../lib/jwtAuth.js";


const router = express.Router();

router.get("/users", jwtAuth, getAllUsers);





export default router;