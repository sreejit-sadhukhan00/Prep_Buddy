import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
dotenv.config();
const initFirebaseAdmin=()=>{
    const apps=getApps();
    if(!apps.length){
        initializeApp({
            credential:cert({
                project_id:process.env.FIREBASE_PROJECT_ID,
                client_email:process.env.FIREBASE_CLIENT_EMAIL,
                private_key:process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,'\n')
            })
        });
    }

    return {
        auth:getAuth(),
        db:getFirestore(),
    }

}

export const {auth,db}=initFirebaseAdmin();