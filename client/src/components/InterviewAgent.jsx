import { div } from "framer-motion/client";
import React, { useContext, useEffect, useState } from "react";
import { cn } from "../lib/utils";
import vapi from "../lib/vapi.sdk.js";
import { useNavigate } from "react-router-dom";
import { interviewer } from "../../constants/index.js";
import axios from "axios";

function InterviewAgent({ username, userid, type,interviewid,questions })

{
  const navigate=useNavigate();

  const call_Status = {
    INACTIVE: "INACTIVE",
    CONNECTING: "CONNECTING",
    ACTIVE: "ACTIVE",
    FINISHED: "FINISHED",
  };
  const [isSpeaking, setisSpeaking] = useState(false);
  const [callStatus, setcallStatus] = useState(call_Status.INACTIVE);
  const [messages,setmessages]=useState([]);

     useEffect(() => {
         const onCallStart=()=>{
          setcallStatus(call_Status.ACTIVE);
         }
          const onCallEnd=()=>{
            setcallStatus(call_Status.FINISHED);
          }
          const onMessageReceived=(message)=>{
            const newmessage={
              role:message.role,
              content:message.transcript,

            }
            setmessages((prev)=>[...prev,newmessage]);
          }

         const onSpeechStart=()=>{
          setisSpeaking(true);
         } 
          const onSpeechEnd=()=>{
            setisSpeaking(false);
          }

          const onError=(error)=>{
            console.log("Error",error);
          }

          vapi.on('call-start',onCallStart);
          vapi.on('call-end',onCallEnd);
          vapi.on('message',onMessageReceived);
          vapi.on('speech-start',onSpeechStart);
          vapi.on('speech-end',onSpeechEnd);
          vapi.on('error',onError);


          return()=>{
            vapi.off('call-start',onCallStart);
          vapi.off('call-end',onCallEnd);
          vapi.off('message',onMessageReceived);
          vapi.off('speech-start',onSpeechStart);
          vapi.off('speech-end',onSpeechEnd);
          vapi.off('error',onError);
          }
     }, []);
     
const handleGenerateFeedback=async(messages)=>{
   console.log('generate feedback here')
   const response=await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/vapi/createFeedback`,{
      interviewid
      ,userid
      ,transcript:messages
   })
    const {success,id}=response.data;
   console.log(success)
   if(success && id){
      navigate(`/interview/${interviewid}/feedback`)
   }else{
    console.log("Error in generating feedback");
    navigate('/home')
   }
}

  useEffect(() => {
    if(callStatus===call_Status.FINISHED){
      if(type==='generate'){
        navigate('/home');
      }else{
        handleGenerateFeedback(messages);

      }
    }
    
  }, [messages,callStatus,type,userid]);
  

  const handleCall=async()=>{
        setcallStatus(call_Status.CONNECTING);

        if(type==='generate'){
          await vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID, {
            variableValues: {
              username: username,
              userid: userid,
            }
          });
        }else{
          let formattedquestions="";
          if(questions){
            formattedquestions=questions.map((question)=>`- ${question}`).join('\n')
          }
        await vapi.start(interviewer,{
          variableValues:{
            questions:formattedquestions,
          }
        })


        }
        
  }

  const handleDisconnect=async()=>{
          setcallStatus(call_Status.FINISHED);
          vapi.stop();
  }

  const latestmessage=messages[messages.length-1]?.content;

  const isCallInactiveOrFinished=callStatus===call_Status.INACTIVE || callStatus===call_Status.FINISHED;

  return (
    <>
      <div className="call-view mb-4">
        <div className="card-interviewer">
          <div className="avatar">
            <img
              src="/ai-avatar.png"
              alt="vapi-ai"
              width={65}
              height={54}
              className="object-fit"
            />
            {isSpeaking && <span className="animate-speak" /> }
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <img
              src="/user-avatar.png"
              alt="user"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{username}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border mb-8">
          <div className="transcript">
            <p
              className={cn(
                "transition-opacity duration-500",
                "animate-fadeIn"
              )}
              key={latestmessage}
            >
              {latestmessage}
            </p>
          </div>
        </div>
      )}

      {/* button creation  */}
      <div className="w-full flex justify-center">
        {callStatus !== call_Status.ACTIVE ? (
          <button
          onClick={handleCall}
          className="btn-call relative w-24 h-12 flex items-center justify-center">
            {/* PING ANIMATION SPAN */}
            <span className="relative flex items-center justify-center">
  {/* Animated Dots (Ping style) */}
  {callStatus === call_Status.CONNECTING ? (
    <span className="flex gap-1">
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-ping" />
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-ping delay-200" />
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-ping delay-400" />
    </span>
  ) : (
    <span>
      {isCallInactiveOrFinished
        ? "Call"
        : ". . ."}
    </span>
  )}
</span>
          </button>
        ) : (
          <button onClick={handleDisconnect} className="btn-disconnect">END</button>
        )}
      </div>
    </>
  );
}

export default InterviewAgent;
