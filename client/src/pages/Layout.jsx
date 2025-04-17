import { div } from 'framer-motion/client'
import React from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import '../index.css'

function Layout() {
  return (
<motion.div className='bg-[url("/pattern.png")] bg-top bg-no-repeat h-screen w-screen'
initial={{ backgroundPosition: "0% 0%" }}
animate={{ backgroundPosition: "100% 0%" }}
transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
>
<Outlet />
</motion.div>
  )
}

export default Layout