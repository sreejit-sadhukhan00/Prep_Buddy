import React from 'react'
import {  Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion';

function UserNav({children}) {
    const slidedown = {
        hidden: { y:-50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
      };
  return (
   <>
    <div className=' h-20 flex items-center justify-between '>
        <motion.div className='flex  justify-center gap-4'
        initial="hidden"
                    animate="visible"
                    variants={slidedown}
        >
            <Link to='/home'>
            <img src="/logo.svg" alt="img" className='ml-6' />
            </Link>
            <h3 className='font-serif
            hover:text-3xl duration-500 cursor-pointer animate-in
            '>Prep-Wise</h3>
        </motion.div>
          
    </div>
    <Outlet/>
   </>
  )
}

export default UserNav