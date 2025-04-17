import express from "express"; 
import { setSessionCookie, signIn, signUp, verifySession } from "../Middleware/auth.middleware.js";

const router = express.Router(); 


router.post("/signup",signUp);

router.post("/session",setSessionCookie);
router.post("/signin",signIn);
router.get('/verify',verifySession);

export default router;