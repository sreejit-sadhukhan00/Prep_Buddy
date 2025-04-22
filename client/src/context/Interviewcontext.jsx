import React, { createContext, useState } from 'react'



export const InterviewdataContext=createContext();
function Interviewcontext({children}) {
    const [interviewData, setInterviewData] = useState([]);
  return (
    <div>
        <InterviewdataContext.Provider value={{interviewData,setInterviewData}}>
            {children}
        </InterviewdataContext.Provider>
    </div>
  )
}

export default Interviewcontext