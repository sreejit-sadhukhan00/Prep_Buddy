import express from "express"; 
import { setSessionCookie, signUp } from "../Middleware/auth.middleware.js";

const router = express.Router(); 


router.post("/signup",signUp);

router.post("/session",setSessionCookie);


export default router;