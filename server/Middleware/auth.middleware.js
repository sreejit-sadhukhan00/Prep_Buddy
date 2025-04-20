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
       
    const newuserRecord = await db.collection('users').doc(uid).get();
    // Return success response
    return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: newuserRecord.data()
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
          };

          const expiresIn = 60 * 60 * 24 * 7 * 1000;
      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: expiresIn // 1 week
      });
    
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost'
      };
      
      res.cookie('session', sessionCookie, options);
      return res.status(200).json({ success: true });

    } catch (error) {
      console.error('Detailed error:', error);
        return res.status(401).json({ 
            success: false,
            message: error.message || 'Failed to create session'
        });
    }
  };


const signIn=async(req,res)=>{
  try {
    const { email, idToken } = req.body;
    if(!email||!idToken){
      return res.status(400).json({
        success:false,
        message:"Email and Id Token are required"
      });
    };
    const userRecord=auth.getUserByEmail(email);

    if(!userRecord){
      return res.status(400).json({
        success:false,
        message:"User does not exist, create an Account"
      });
    };
    
    return await setSessionCookie(req, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error signing in',
    });
  }
};

const verifySession = async (req, res) => {
  try {
    const sessionCookie = req.cookies.session || '';
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const { uid } = decodedClaims;
    // Fetch additional user data from Firestore
    const userDoc = await db.collection('users').doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : {};
    const userDetails = {
      ...userData,
      // Make sure important fields are included
      uid: decodedClaims.uid,
      email: decodedClaims.email,
      name: userData.name || decodedClaims.name
    };

     
    return res.status(200).json({
      success: true,
      user: decodedClaims,
      data: userDetails,
    });

    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

  export{signUp,setSessionCookie,signIn,verifySession};