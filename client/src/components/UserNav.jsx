import React, { useContext } from 'react'
import {  Link, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { userDataContext } from '../context/Usercontext';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';

function UserNav() {
    const navigate=useNavigate();
    const {userData}=useContext(userDataContext)
    const slidedown = {
        hidden: { y:-50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
      };

    const onclickHandler=async()=>{
        try {
            const res=await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`,{
                withCredentials:true
            })
            console.log(res);
             if(res.data.success){
                    navigate('/signin')
             }
             else{
                toast.error("Logout Failed");
             }
    
        } catch (error) {
            console.log(error);
            toast.error("Logout Failed");
        }
    }
  return (
   <>
   <div className='flex justify-between px-4 scroll-smooth overflow-x-hidden items-center'>
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

    <div className='flex items-center gap-8 mr-6'>
        <h2 className='font-serif text-lg'>{userData?.name}</h2>
    <Button variant={"outline"} className='bg-white text-black hover:bg-gray-200 hover:text-black duration-500'
    onClick={onclickHandler}
    >
       <div className='flex items-center gap-2'>
        <h4 className='text-base text-slate-100'>Sign Out</h4>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(255,255,255,1)"><path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path></svg>
        </div> 
    </Button>
    </div>
   </div>
    <Outlet/>
   </>
  )
}

export default UserNav