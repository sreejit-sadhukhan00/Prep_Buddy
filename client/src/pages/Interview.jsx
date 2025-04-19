import React from 'react'
import InterviewAgent from '../components/InterviewAgent'

function Interview() {
  return (
    <div className='max-w-6xl mx-auto'>
   
    <h3>Interview Generation</h3>
        <InterviewAgent userName="user1" userId="user1" type="generate"/>
    </div>
  )
}

export default Interview