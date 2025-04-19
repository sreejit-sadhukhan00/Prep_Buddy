import { div } from "framer-motion/client";
import React, { useState } from "react";
import { cn } from "../lib/utils";

function InterviewAgent({ username, userId, type }) {
  const call_Status = {
    INACTIVE: "INACTIVE",
    CONNECTING: "CONNECTING",
    ACTIVE: "ACTIVE",
    FINISHED: "FINISHED",
  };
  const messages = [
    "Hi there! How can I help you today?",
    "Can you tell me more about your experience?",
    "What are your strengths and weaknesses?",
    "Why do you want to work with us?",
    "How do you handle tight deadlines?",
    "Tell me about a challenge you overcame.",
    "Do you prefer working in a team or alone?",
    "Where do you see yourself in five years?",
    "Where do you see yourself in five years?",
  ];
  const lastmessage = messages[messages.length - 1];
  const [isSpeaking, setisSpeaking] = useState(true);
  const [callStatus, setcallStatus] = useState(call_Status.CONNECTING);
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
            {isSpeaking ? <span className="animate-speak" /> : null}
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
              key={lastmessage}
            >
              {lastmessage}
            </p>
          </div>
        </div>
      )}

      {/* button creation  */}
      <div className="w-full flex justify-center">
        {callStatus !== call_Status.ACTIVE ? (
          <button className="btn-call relative w-24 h-12 flex items-center justify-center">
            {/* PING ANIMATION SPAN */}
            <span
              className={`absolute rounded-full opacity-75 animate-ping w-16 h-16 border-4 border-zinc-500 ${
                callStatus !== call_Status.CONNECTING ? "hidden" : ""
              }`}
            />

            {/* BUTTON LABEL */}
            <span>
              {callStatus === call_Status.INACTIVE ||
              callStatus === call_Status.FINISHED
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">END</button>
        )}
      </div>
    </>
  );
}

export default InterviewAgent;
