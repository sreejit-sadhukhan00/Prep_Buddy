import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './pages/Layout';

import { Toaster } from './components/ui/sonner';
import UserHome from './pages/UserHome';
import UserNav from './components/UserNav';
import IsAuthenticated from './components/IsAuthenticated';
import Interview from './pages/Interview';
import InterviewPage from './pages/InterviewPage';
import Feedback from './pages/Feedback';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Toaster />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route  element={<Layout/>}>
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route element={<UserNav/>}> 
      <Route element={<IsAuthenticated/>}>
      <Route path="/home" element={<UserHome/>} />
      <Route path="/interview" element={<Interview/>} />
      <Route path="/interview/:id" element={<InterviewPage/>} />
      <Route path="/interview/:id/feedback" element={<Feedback/>} />
      </Route>
      
          </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App;
