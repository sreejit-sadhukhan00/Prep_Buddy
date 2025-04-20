import express from "express"; 
import { generate, sendResponseFromGemini } from "../Middleware/vapi.middleware.js";

const router=express.Router();

router.get("/generate",generate)
router.post("/question-generate",sendResponseFromGemini)

export default router;