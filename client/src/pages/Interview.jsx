import React, { useContext } from 'react'
import InterviewAgent from '../components/InterviewAgent'
import { userDataContext } from '../context/Usercontext';

function Interview() {
  const {userData} = useContext(userDataContext);
  return (
    <div className='max-w-6xl mx-auto'>
   
    <h3>Interview Generation</h3>
        <InterviewAgent username={userData?.name} userid={userData?.uid} type="generate"/>
    </div>
  )
}

export default Interview