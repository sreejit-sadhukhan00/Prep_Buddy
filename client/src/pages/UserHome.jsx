import React, { useContext, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { dummyInterviews } from '../../constants';
import InterviewCard from '../components/InterviewCard';
import { userDataContext } from '../context/Usercontext';

function UserHome() {
  const {userData} = useContext(userDataContext);
  useEffect(() => {
     console.log("User Data:", userData);
     }, [])
  
  
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
    {dummyInterviews.map((interview) => (
      <InterviewCard key={interview.id} interview={interview} />
    ))}

    {/* <p>You haven't taken any interviews yet</p> */}
  </div>
</section>


   <section className='flex flex-col gap-6 mt-8'>
       <h2 className='sm:ml-8'>Take an Interview</h2>

       <div className='interviews-section'>
<p>There are no interviews available</p>
       </div>
   </section>
    </div>
  )
}

export default UserHome