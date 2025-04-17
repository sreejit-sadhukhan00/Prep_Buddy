import React from 'react'
import { Button } from "../components/ui/button"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
function Nav() {
    const slideUp = {
        hidden: { y:-50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
      };
  return (
    <div className=' h-15 flex items-center justify-between'>
        <div className='flex  justify-center gap-4'>
            <img src="/logo.svg" alt="img" className='ml-6' />
            <h3 className='font-serif
            hover:text-3xl duration-500 cursor-pointer animate-in
            '>Prep-Wise</h3>
        </div>
    
      <div>
         <motion.div className='flex gap-4 mr-4 '
            
         >
        
        <Link to="/signin"><Button className='text-xl font-serif cursor-pointer' variant="outline">Sign In</Button></Link>
        <Link to="/signup"><Button className='text-xl font-serif cursor-pointer' variant="outline">Sign Up</Button></Link>
        </motion.div>

      </div>
    </div>
  )
}

export default Nav