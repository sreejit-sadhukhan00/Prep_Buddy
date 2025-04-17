
import React from 'react'
import dayjs from 'dayjs';
import { getrandomInterviewCover } from '../../constants';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import DisplayTechIcons from './DisplayTechIcons';
import { motion } from 'framer-motion';

function InterviewCard({interview}) {
    const feedback=null;
    const formatteddate=dayjs(feedback?.createdAt || interview.createdAt || Date.now()).format('MMM D,YYYY');
     
  return (
    <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration:1, ease: 'easeInOut' }}
    // whileHover={{
    //   scale: 1.05,
    //   duration:0.2
    // }}
    className='card-border w-[360px] mmax-sm:w-full min-h-85 hover:scale-105 duration-200 cursor-pointer'>
        <div className='card-interview'>
<div>
    <div className='absolute top-0 right-0 w-fit px-6 py-2 rounded-bl-lg bg-light-600 '>
        <p className="badge-text">
         {interview.type}
        </p>
    </div>

    <img src={getrandomInterviewCover()} alt="cover" width={60} height={60} className='rounded-full object-fit '/>

    <h3 className='mt-5 capitalize'>
        {interview.role} Interview
    </h3>
    <div className='flex flex-row gap-5 mt-3'>
         <div className='flex flex-row gap-2'>
            <img src='/calendar.svg' alt="calender" width={22} height={22} />
            <p className='text-md'>{formatteddate}</p>
         </div>

         <div className='flex flex-row gap-2 items-center'>
            <img src="/star.svg" alt="rating" />
            <h3 className='text-sm'>{feedback?.totalScore|| '---'}/100</h3>
         </div>
    </div>
    <p className='line-clamp-2 mt-5'>
  {feedback?.assesment || "You have not taken this interview yet. Take it now to improve skills"}
    </p>
</div>
       <div className='flex flex-row justify-between'>
          <DisplayTechIcons Techstack={interview.techstack}/>

          <Button className='btn-primary'>
             <Link to={feedback? `interview/${interview.id}/feedback` : `/interview/${interview.id}`}>
             {feedback?'View Feedback':'View Interview'}
             </Link>
            </Button>
       </div>
        </div>
    </motion.div>
  )
}

export default InterviewCard