import cookieParser from "cookie-parser";
import { auth, db } from "../Firebase/admin.js";

 const signUp = async(req,res) => {
  const { uid, name, email } = req.body;
        
  try {
    const userRecord = await db.collection('users').doc(uid).get();
    if(userRecord.exists) {
        return res.status(400).json({
            success: false,
            message: 'User already exists. Please SignIn instead',
          });
    }
   
    await db.collection('users').doc(uid).set({
        name, email
    });

    // Return success response
    return res.status(200).json({
        success: true,
        message: 'User registered successfully',
      });

  } catch (error) {
    console.log('Error signing up:', error);

    if(error.code === 'auth/email-already-in-use') {
       return res.status(400).json({
        success: false,
        message: 'Email already in use',
      });
    }

    return res.status(500).json({
        success: false,
        message: 'Error signing up',
      });
  }
};


 const setSessionCookie = async(req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.status(400).json({
              success: false,
              message: 'ID token is required'
            });
          }
          const expiresIn = 60 * 60 * 24 * 7 * 1000;
      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: expiresIn // 1 week
      });
  
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production
        sameSite: 'strict'
      };
      
      res.cookie('session', sessionCookie, options);
      return res.status(200).json({ success: true });

    } catch (error) {
      console.error('Error setting session cookie:', error);
      return res.status(401).json({ 
      success: false,
      message: 'Failed to create session'
    });
    }
  };


  export{signUp,setSessionCookie};