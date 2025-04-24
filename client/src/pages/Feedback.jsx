import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userDataContext } from '../context/Usercontext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function Feedback() {
  const {userData}=useContext(userDataContext);
  const{ interviewid } = useParams();
  const [loading,setloading]=useState(false);
  const [feedback,setfeedback]=useState(null);
  const navigate=useNavigate();
  
  useEffect(() => {
    const fetchFeedback=async()=>{
      try {
        setloading(true);
        const result=await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/vapi/getfeedback`,{
          params:{
            interviewid:interviewid,
            userId:userData?.uid,
          },
          withCredentials:true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if(result.status===200){
          setfeedback(result.data.data);
          setloading(false);
        }else{
          navigate('/home');
          console.log("Error fetching feedback",result.data.message);
          setloading(false);
        }
      } catch (error) {
        navigate('/home');
        console.log("Error fetching feedback",error.message);
        setloading(false);
      }
    }
    fetchFeedback();
    
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Hover animation for category cards with traveling glow
  const scoreCardVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 0 8px rgba(0, 200, 255, 0.6)",
      transition: { 
        duration: 0.2,
        boxShadow: { duration: 0.2 }
      }
    }
  };
  

  // Gradient animation for the header
  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)",
        "linear-gradient(135deg, #3730a3 0%, #312e81 100%)",
        "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };

  // Traveling glow border animation
  const travelingGlowVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  return (
    <div className="section-feedback min-h-screen p-6 md:p-8 lg:p-12 font-serif bg-transparent">
      {loading ? (
        <div className="loading-container">
          <div className="custom-spinner">
            <div className="spinner-dot spinner-dot1"></div>
            <div className="spinner-dot spinner-dot2"></div>
            <div className="spinner-dot spinner-dot3"></div>
            <div className="spinner-dot spinner-dot4"></div>
          </div>
          <p className="loading-text animate-bounce text-center font-serif text-lg text-gray-400">Loading feedback...</p>
        </div>
      ) : feedback ? (
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="col-span-2 bg-gray-900 rounded-xl p-6 relative overflow-hidden border border-gray-800"
              variants={gradientVariants}
              animate="animate"
              style={{ 
                background: "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)" 
              }}
            >
              <motion.h1 
                className="text-2xl md:text-3xl font-bold text-white"
                variants={itemVariants}
              >
                Interview Performance Report
              </motion.h1>
              <motion.p 
                className="text-indigo-100 mt-2"
                variants={itemVariants}
              >
                {new Date(feedback.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </motion.p>
            </motion.div>

            <motion.div 
              className="bg-gray-900 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-gray-800"
            >
              {/* Traveling glow border effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute inset-[-100%] w-[300%] h-[300%]"
                  style={{
                    background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(129, 140, 248, 0.7) 120deg, transparent 180deg, transparent 360deg)",
                  }}
                  variants={travelingGlowVariants}
                  animate="animate"
                />
              </div>
              
              {/* Dark overlay to make sure only the border glows */}
              <div className="absolute inset-[1px] bg-gray-900 rounded-[10px] z-[1]"></div>
              
              {/* Content */}
              <h3 className="text-gray-400 mb-2 relative z-10">Total Score</h3>
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 relative z-10">
                {feedback.totalScore}
              </div>
              <p className="text-gray-500 text-sm mt-1 relative z-10">out of 100</p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <motion.div 
              className="md:col-span-2 bg-gray-900 rounded-xl p-6 border border-gray-800"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
                Category Scores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedback.categoryScores.map((category, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 relative overflow-hidden"
                    variants={scoreCardVariants}
                    whileHover="hover"
                  >
                    {/* Traveling glow border on hover */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 rounded-lg overflow-hidden"
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div 
                        className="absolute inset-[-100%] w-[300%] h-[300%]"
                        style={{
                          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(129, 140, 248, 0.7) 120deg, transparent 180deg, transparent 360deg)",
                        }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Dark overlay to make sure only the border glows */}
                      <div className="absolute inset-[1px] bg-gray-800 rounded-[7px] z-[1]"></div>
                    </motion.div>

                    <motion.div 
                      className="absolute inset-0 opacity-10 z-0"
                      initial={{ background: "linear-gradient(45deg, transparent 0%, rgba(99, 102, 241, 0.1) 100%)" }}
                      animate={{ 
                        background: [
                          "linear-gradient(45deg, transparent 0%, rgba(99, 102, 241, 0.1) 100%)",
                          "linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)",
                          "linear-gradient(45deg, transparent 0%, rgba(99, 102, 241, 0.1) 100%)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    />
                    <div className="flex justify-between items-center mb-2 relative z-10">
                      <h3 className="font-medium text-gray-200">{category.name}</h3>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                          <span 
                            className={`text-lg font-bold ${
                              category.score >= 70 ? 'text-green-400' :
                              category.score >= 40 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}
                          >
                            {category.score}
                          </span>
                        </div>
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-transparent"
                          initial={{ borderColor: 'rgba(75, 85, 99, 0.5)' }}
                          animate={{ 
                            borderColor: [
                              'rgba(75, 85, 99, 0.5)',
                              category.score >= 70 ? 'rgba(5, 150, 105, 0.5)' :
                              category.score >= 40 ? 'rgba(217, 119, 6, 0.5)' :
                              'rgba(220, 38, 38, 0.5)'
                            ],
                            boxShadow: [
                              "0px 0px 0px rgba(0,0,0,0)",
                              category.score >= 70 ? "0px 0px 8px rgba(5, 150, 105, 0.3)" :
                              category.score >= 40 ? "0px 0px 8px rgba(217, 119, 6, 0.3)" :
                              "0px 0px 8px rgba(220, 38, 38, 0.3)",
                              "0px 0px 0px rgba(0,0,0,0)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 relative z-10">{category.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right sidebar - 1/3 width */}
            <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
              {/* Areas for Improvement */}
              <motion.div 
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden"
                variants={itemVariants}
              >
                {/* Traveling glow border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <motion.div 
                    className="absolute inset-[-100%] w-[300%] h-[300%]"
                    style={{
                      background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(220, 38, 38, 0.5) 120deg, transparent 180deg, transparent 360deg)",
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                {/* Dark overlay to make sure only the border glows */}
                <div className="absolute inset-[1px] bg-gray-900 rounded-[10px] z-[1]"></div>
                
                <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2 relative z-10">
                  Areas for Improvement
                </h2>
                <div className="space-y-3 relative z-10">
                  {feedback.areasForImprovement.map((area, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      whileHover={{ x: 3 }}
                    >
                      <span className="text-red-400 mr-2 text-lg">•</span>
                      <span className="text-gray-300">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Strengths - only if present */}
              {feedback.strengths && feedback.strengths.length > 0 && (
                <motion.div 
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden"
                  variants={itemVariants}
                >
                  {/* Traveling glow border */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <motion.div 
                      className="absolute inset-[-100%] w-[300%] h-[300%]"
                      style={{
                        background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(5, 150, 105, 0.5) 120deg, transparent 180deg, transparent 360deg)",
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  {/* Dark overlay to make sure only the border glows */}
                  <div className="absolute inset-[1px] bg-gray-900 rounded-[10px] z-[1]"></div>
                  
                  <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2 relative z-10">
                    Strengths
                  </h2>
                  <div className="space-y-3 relative z-10">
                    {feedback.strengths.map((strength, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        whileHover={{ x: 3 }}
                      >
                        <span className="text-green-400 mr-2 text-lg">•</span>
                        <span className="text-gray-300">{strength}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Final Assessment - Full width */}
            <motion.div 
              className="md:col-span-3 bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden"
              variants={itemVariants}
            >
              {/* Traveling glow border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute inset-[-100%] w-[300%] h-[300%]"
                  style={{
                    background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(79, 70, 229, 0.5) 120deg, transparent 180deg, transparent 360deg)",
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              </div>
              {/* Dark overlay to make sure only the border glows */}
              <div className="absolute inset-[1px] bg-gray-900 rounded-[10px] z-[1]"></div>
              
              <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2 relative z-10">
                Final Assessment
              </h2>
              <motion.div 
                className="bg-gray-800 border-l-4 border-indigo-500 p-4 rounded-r-md relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-5"
                  initial={{ background: "linear-gradient(135deg, #4f46e5, transparent)" }}
                  animate={{ 
                    background: [
                      "linear-gradient(135deg, #4f46e5, transparent)",
                      "linear-gradient(135deg, transparent, #4f46e5)",
                      "linear-gradient(135deg, #4f46e5, transparent)"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <p className="text-gray-300 relative z-10">{feedback.finalAssessment}</p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Button Section */}
          <motion.div 
            className="mt-8 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button 
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
            >
              <motion.span
                className="absolute inset-0"
                initial={{ background: "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)" }}
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)",
                    "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                    "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">Back to Home</span>
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="no-feedback bg-gray-900 rounded-xl p-8 max-w-md mx-auto text-center border border-gray-800 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Traveling glow border */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute inset-[-100%] w-[300%] h-[300%]"
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, rgba(129, 140, 248, 0.5) 120deg, transparent 180deg, transparent 360deg)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {/* Dark overlay to make sure only the border glows */}
          <div className="absolute inset-[1px] bg-gray-900 rounded-[10px] z-[1]"></div>
          
          <p className="text-gray-400 relative z-10">No feedback available for this interview.</p>
          <motion.button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
          >
            Back to Home
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default Feedback