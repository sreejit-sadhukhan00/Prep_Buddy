import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { dummyInterviews } from '../../constants';
import InterviewCard from '../components/InterviewCard';
import { userDataContext } from '../context/Usercontext';
import axios from 'axios';
import { InterviewdataContext } from '../context/Interviewcontext';

 function UserHome() {
  const {interviewData, setInterviewData} = useContext(InterviewdataContext);
   const {userData} = useContext(userDataContext);
    //  to get all the interviews
      console.log("UserData",userData);
    const [latest, setlatest] = useState([])
    const [own, setown] = useState([])

     useEffect(() => {
      const fetchInterviews = async () => {
        try {
          const [ownRes, latestRes] = await Promise.all([
            axios.post(
              `${import.meta.env.VITE_BACKEND_BASE_URL}/vapi/getinterviews`,
              { user: userData?.uid },
              {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
              }
            ),
            axios.get(
              `${import.meta.env.VITE_BACKEND_BASE_URL}/vapi/getlatest`,
              {
                params: { userId: userData?.uid },
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
              }
            ),
          ]);
          console.log(latestRes)
          // Combine and remove duplicates by id if needed
          setown( ownRes.data.data || []);
           setlatest( latestRes.data.data || []);
           const combined = [
            ...(ownRes.data.data || []),
            ...(latestRes.data.data || [])
          ];
          setInterviewData(combined);
        } catch (err) {
          console.error(err);
          setInterviewData([]);
        }
      };
      fetchInterviews();
    }, []);

    console.log("Latest",latest);
   const hasPastInterviews=own?.length>0;
   const hasUpcomingInterviews=latest?.length>0;
     
  return (
    <div className='max-w-6xl mx-auto sm:w-full '>
    <section className='card-cta flex justify-between items-center p-4'>
  <div className='flex flex-col gap-6 max-w-sm w-full ml-10 mr-10'>
    <h2 className='font-serif shadow-2xl'>Get Interview Ready With AI-Powered practice & Feedback</h2>
    <p className='text-lg font-serif'>
      Practice on real interview questions and get instant feedback on your performance.
    </p>

    <Button asChild className='btn-primary max-sm:w-full hover:animate-bounce duration-200'>
      <Link to='/interview'>Start Interview</Link>
    </Button>
  </div>


  <motion.img
    src="/robot.png"
    alt="robo-dude"
    width={400}
    height={400}
    className='max-sm:hidden cursor-pointer'
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration:4, ease: 'easeOut' }}
    whileHover={{ scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      } }}
  />


</section>
 
<section className="flex flex-col gap-6 mt-8 mx-auto">
  <h2 className="font-bold font-serif ml-4  text-center sm:text-left sm:ml-8">Your Interviews</h2>

  <div className="interviews-section flex flex-wrap justify-center items-center gap-4 sm:ml-0">
    {hasPastInterviews ?
    own.map((interview) => (
      <InterviewCard key={interview.id} interview={interview} />
    )) : (<p className='text-2xl font-serif text-gray-600 '>You haven't taken any interviews yet</p>)}

    {/*  */}
  </div>
</section>


   <section className='flex flex-col gap-6 mt-8'>
       <h2 className='sm:ml-8'>Take an Interview</h2>
              
       <div className='interviews-section flex flex-wrap justify-center items-center gap-4 sm:ml-0'>
       {hasUpcomingInterviews ?
    latest.map((interview) => (
      <InterviewCard key={interview.id} interview={interview} />
    )) : (<p className='text-4xl '>You haven't taken any interviews yet</p>)}
       </div>
       <p>There are no new interviews available</p>
   </section>
    </div>
  )
}

export default UserHome