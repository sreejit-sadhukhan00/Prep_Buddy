import React from 'react'
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Formfield } from '../components/Formfield'
import { auth } from '../../Firebase/Client'
import { createUserWithEmailAndPassword } from "firebase/auth";



const signupformSchema=()=>{
  return z.object({
  name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }).max(50),
  email: z.string().email({
      message: "Please enter a valid email.",
    }),
  password: z.string().min(8,{
      message: "Password must be at least 8 characters.",
    }).max(20),
})
}
import { useNavigate } from 'react-router-dom'
function SignUp() {
  const navigate=useNavigate();
  const formschema=signupformSchema();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formschema),
    defaultValues: {
      name: "",
      email:'',
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
        const {name,email,password}=values;
        // user creation in firebase auth
        const userCredentials=await createUserWithEmailAndPassword(auth,email,password);
        // add user to the firstore
        const user={
          name:name,
          email:email,
          uid:userCredentials.user.id
        }
        const result=await axios.post(`${import.meta.env.BACKEND_BASE_URL}/auth/signup`,user);

        if(!result?.success){
          toast.error(result?.message);
          return;
        }
        const idToken = await userCredentials.user.getIdToken();
        const sessionResult = await setSessionCookie(idToken);
        if(!sessionResult.success) {
          toast.error('Failed to create session');
          return;
        }

        form.reset();
        toast.success("Account Created  successfully!");
        navigate('/home');

    } catch (error) {
         console.log(error);
         toast.error("Fill All The Necessary Fields");
         
    }
  }

  return (
    <div className='auth-layout flex-col gap-10'>
        
        <div className=' card-border  *:lg:min-w-[560px]'>
        <div clasName="flex flex-col gap-6 card py-14 px-10">
            <div className='flex flex-row gap-2 justify-center'>
            <img src="/logo.svg" alt="" height={32} width={38} /> 
            <h2 className='text-primary-100'>Prep Wise</h2>
            </div>
            <h3 className='text-center font-md mb-8'>Practice job Interview with AI</h3>
       
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-4 form">
        {/* NAME===>> */}
            <Formfield 
            control={form.control} 
            name="name" 
            label="Name"
            placeholder="Enter your name"/>
            <Formfield 
            control={form.control} 
            name="email" 
            label="Email"
            placeholder="Enter your email"/>
            <Formfield 
            control={form.control} 
            name="password" 
            label="Password"
            placeholder="Enter your password"
            type='password'
            />
            
        <Button className="btn mb-4 hover:animate-in hover:shadow-accent-foreground" type="submit">Create an Account</Button>
      </form>
    </Form>    
    <p className='text-base-100 text-center'>Already have an account? <Link to="/signin"
    className='text-blue-500 underline font-bold'>Sign In</Link></p>
    </div>
    </div>
    </div>
  )
  
}

export default SignUp