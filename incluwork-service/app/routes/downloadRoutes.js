import express from "express";
import * as downloadController from "../controllers/downloadController.js"

const router = express.Router();

router.get("/resume/:file", downloadController.downloadResume);
router.get("/medicalproof/:file", downloadController.downloadProof);

export default router;