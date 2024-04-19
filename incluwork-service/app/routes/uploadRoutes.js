import express from "express";
import multer from "multer";
const upload = multer();
import * as uploadController from "../controllers/uploadController.js"


const router = express.Router();

router.post("/resume", upload.single("file"), uploadController.uploadResume);
router.post("/proof", upload.single("file"), uploadController.uploadProof);

export default router;