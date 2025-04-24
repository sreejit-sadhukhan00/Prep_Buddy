import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getrandomInterviewCover } from '../../constants';
import DisplayTechIcons from '../components/DisplayTechIcons';
import InterviewAgent from '../components/InterviewAgent';
import { userDataContext } from '../context/Usercontext';

function InterviewPage() {
    const {userData}=useContext(userDataContext);
    console.log("userData",userData);
    
    const {id}=useParams();
    const navigate=useNavigate();
    const [interview,setinterview]=useState(null);

    useEffect(() => {
     try {
         const fetchInterviews=async()=>{
            const result= await axios.get(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/vapi/getinterview`,
                {
                    params: {id: id },
                  withCredentials: true,
                  headers: { 'Content-Type': 'application/json' },
                }
              )
              setinterview(result.data.data);
         }
          fetchInterviews();
     } catch (error) {
        navigate('/home')
        console.log(error);
     }
    }, [])
    


  return (
    <>
      <div className='flex flex-row justify-between gap-6 ml-5 mr-20'>
            <div className='flex flex-row gap-4 items-center max-sm:flex-col '>
                   <div className='flex flex-row gap-4 items-center'> 
                       <img src={getrandomInterviewCover()} alt="coverimage" width={50} height={50} className='object-cover rounded-full' />
                           <h3 className='capitalize'>{interview?.role}</h3>
                    </div>    

                    <DisplayTechIcons Techstack={interview?.techstack} />
            </div>
            <p className='bg-dark-200 px-4 py-2 rounded-lg text-center font-semibold font-serif capitalize'>
                {
                    interview?.type
                }
            </p>
      </div>
    

        <div className='mt-10'>
        <InterviewAgent username={userData?.name} userid={userData?.uid} type="interview"
        questions={interview?.questions}
        interviewid={id}
        />
        </div>
    </>
  )
}

export default InterviewPage