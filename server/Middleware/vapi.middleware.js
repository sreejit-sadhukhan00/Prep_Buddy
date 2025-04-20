
import { auth, db } from "../Firebase/admin.js";
import { generateText } from "ai";
import { createGoogleGenerativeAI} from "@ai-sdk/google";
const google = new createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
  });

export const generate=async(req,res)=>{
   res.json({
    success:true,
    message:"VAPI is working fine",
   })
}

export const sendResponseFromGemini=async(req,res)=>{
    const {role,type,level,techstack,amount,userid}=req.body;

    try {
        const result=await generateText({
            model:google('gemini-2.0-flash-001'),
            prompt:`You are an AI assistant designed strictly to generate interview questions only.

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
        const rawtext=result.text.trim();
       const parsedQuestions = JSON.parse(rawtext);
        const interview={
            role,type,level,techstack: techstack.split(',').map(t => t.trim()),
            questions:parsedQuestions,
            userId:userid,
            finalized:true,
            createdAt:new Date().toISOString(),
        }

        await db.collection("interviews").add(interview);
        return res.status(200).json({
            success:true,
            message:"Interview questions generated successfully",
            data:interview,
        })
    } catch (error) {
        console.error("Error sending response from Gemini:", error);
        return res.status(500).json({
            success: false,
            message: 'Error sending response from Gemini',
          });

    }
}