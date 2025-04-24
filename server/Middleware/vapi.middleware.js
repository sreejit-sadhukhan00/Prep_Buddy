import { auth, db } from "../Firebase/admin.js";
import { generateObject, generateText } from "ai";
import { createGoogleGenerativeAI} from "@ai-sdk/google";
import  feedbackSchema from "../lib/Schema.js";

const google = new createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
  });

export const generate=async(req,res)=>{
   res.json({
    success:true,
    message:"VAPI is working fine",
   })
}

export const sendResponseFromGemini = async(req, res) => {
    // Handle both direct body (from Postman) and Vapi message structure
    let params = {};
    
    // Check if this is a Vapi request
    if (req.body?.message?.call?.parameters) {
        params = req.body.message.call.parameters;
    } 
    // Otherwise assume direct request from Postman or similar client
    else {
        params = req.body;
    }
    
    console.log("Received request body:", req.body);
    console.log("Extracted parameters:", params);
    const {role, type, level, techstack, amount, userid} = params;
    
    if (!role || !type || !level || !techstack || !userid) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields',
            receivedData: {role, type, level, techstack, userid} // For debugging
        });
    }
    
    try {
        const result = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `You are an AI assistant designed strictly to generate interview questions only.

Do not provide answers or explanations.

Only generate questions related to a job interview.

Do not answer or acknowledge any queries unrelated to interview questions.

First, validate the input parameters:
- Role: "${role}" - Must be a valid job role (e.g., "Software Engineer", "Product Manager")
- Tech Stack: "${techstack}" - Must contain valid technologies
- Experience Level: "${level}" - Must be a valid experience level
- Focus Area: "${type}" - Must be either "behavioral" or "technical"

If ANY of these parameters are missing, invalid, or seem unrelated to job interviews:
- Return: ["I can only generate interview questions when provided with valid job role and technology information."]

If inputs are valid, then:
- Return exactly ${amount} questions.
- Format: a valid JSON array like this → ["Question 1", "Question 2", "Question 3"]
- Do not use markdown, special characters (like *, /, #, etc.), or include any additional text.
- Questions are meant to be spoken by a voice assistant. Keep them clear and concise.
- Do not include any greetings or closing statements.

Only return the array. Do not say anything else.`,
        });
        const rawtext = result.text.trim();
        const parsedQuestions = JSON.parse(rawtext);
        const interview = {
            role, type, level, techstack: techstack.split(',').map(t => t.trim()),
            questions: parsedQuestions,
            userId: userid,
            finalized: true,
            createdAt: new Date().toISOString(),
        }

        await db.collection("interviews").add(interview);
        return res.status(200).json({
            success: true,
            message: "Interview questions generated successfully",
            data: interview,
        })
    } catch (error) {
        console.error("Error sending response from Gemini:", error);
        return res.status(500).json({
            success: false,
            message: 'Error sending response from Gemini',
          });

    }
}


export const fetchinterview=async(req,res)=>{
    const {user}=req.body;
    if(!user){
        return res.status(400).json({
            success:false,
            message:"user id is required"
        })
    }
    const interview=await db.collection("interviews").
    where("userId","==",user)
    .orderBy("createdAt","desc")
    .get();

    if(interview.empty){
        return res.status(200).json({
            success:false,
            message:"No interview found",
            data:[]
        })
    }
    const interviews=interview.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
    }));
    return res.status(200).json({
        success:true,
        message:"Interviews fetched successfully",
        data:interviews,
    })
}
export const getLatestInterviews=async(req,res)=>{
   const {userId,limit=20}=req.query;
    if(!userId){
        return res.status(400).json({
            success:false,
            message:"user id is required"
        })
    }
    const interview=await db.collection("interviews")
    .orderBy("createdAt","desc")
    .where("finalized","==",true)
    .where("userId","!=",userId)
    .limit(limit)
    .get();

    if(interview.empty){
        return res.status(404).json({
            success:false,
            message:"No interview found",
        })
    }
    const interviews=interview.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
    }));
    return res.status(200).json({
        success:true,
        message:"Interviews fetched successfully",
        data:interviews,
    })
}

export const getInterviewById=async(req,res)=>{
    const {id}=req.query;

    if(!id){
        return res.status(400).json({
            success:false,
            message:"Interview id is required"
        })
    }
    const docRef = db.collection("interviews").doc(id);
    const doc = await docRef.get();

        if(doc.empty){
            return res.status(404).json({
                success:false,
                message:"Interview not found",
            })
        }
        const interview = doc.data();
  console.log(interview)
        return res.status(200).json({
            success:true,
            message:"Interview fetched successfully",
            data:interview
        })
    }


export const createFeedback = async(req, res) => {
    const {interviewid, userid, transcript} = req.body;
    console.log("Transcript", transcript)
    try {
        const formattedTranscript = transcript.map((sentence) => (
            `-${sentence.role}:${sentence.content}\n`
        )).join('');

        const {object} = await generateObject({
            model: google('gemini-2.0-flash-001', {
                structuredOutputs: false,
            }),
            schema: feedbackSchema,
            prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
            system:
                "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        });

        const {
            totalScore,
            categoryScores,
            strengths,
            areasForImprovement,
            finalAssessment
        } = object;

        const feedback = await db.collection('feedback').add({
            interviewid,
            userid,
            totalScore,
            categoryScores, // Note: fixed typo from 'catagoryScores' to 'categoryScores'
            strengths,
            areasForImprovement,
            finalAssessment,
            createdAt: new Date().toISOString(),
        });

        if(!feedback) {
            return res.status(500).json({
                success: false,
                message: "Error in creating feedback",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Feedback created successfully",
            id: feedback.id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating feedback",
        })
    }
}

export const GetFeedback=async(req,res)=>{
    const {interviewid,userId}=req.query;
    if(!userId){
        return res.status(400).json({
            success:false,
            message:"user id is required"
        })
    }
    const feedback=await db.collection("feedback")
    .where("interviewid","==",interviewid)
    .where("userid","==",userId)
    .limit(1)
    .get();

    if(feedback.empty){
        return res.status(404).json({
            success:false,
            message:"No interview found",
        })
    }
    const feedBack=feedback.docs[0];
    return res.status(200).json({
        success:true,
        message:"Interviews fetched successfully",  
        data:feedBack.data(),
    })
}