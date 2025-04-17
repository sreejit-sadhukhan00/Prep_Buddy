import React from 'react'
import { getTechLogos } from '../../constants'

import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';

function DisplayTechIcons({Techstack}) {
    const techIcons= getTechLogos(Techstack);
  return (
    <div className='flex gap-2 items-center'>
        {techIcons.slice(0,2).map((tech, index) =>  
              (
                 <div key={index} className='relative group bg-dark-300 rounded-full p-2 flex-center '>
                  <span className='tech-tooltip'>{tech.tech}</span>
                  <motion.img 
                key={index}
              src={tech.url} 
              alt="" 
              width={30}
              height={30}
              srcset=""
              />
                    </div>
                )
        )}
    </div>
  )
}

export default DisplayTechIcons