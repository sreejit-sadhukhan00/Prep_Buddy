import express from "express"; 
import { createFeedback, fetchinterview, generate, GetFeedback, getInterviewById, getLatestInterviews, sendResponseFromGemini } from "../Middleware/vapi.middleware.js";

const router=express.Router();

router.get("/generate",generate)
router.post("/question-generate",sendResponseFromGemini)
router.post("/getinterviews",fetchinterview);
router.get("/getlatest",getLatestInterviews);
router.get('/getinterview',getInterviewById);
router.post('/createFeedback',createFeedback);
router.get('/getfeedback',GetFeedback)
export default router;