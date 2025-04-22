import express from "express"; 
import { fetchinterview, generate, getLatestInterviews, sendResponseFromGemini } from "../Middleware/vapi.middleware.js";

const router=express.Router();

router.get("/generate",generate)
router.post("/question-generate",sendResponseFromGemini)
router.post("/getinterviews",fetchinterview);
router.get("/getlatest",getLatestInterviews);
export default router;