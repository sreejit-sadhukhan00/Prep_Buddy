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
import { useNavigate } from 'react-router-dom'

const signinformSchema=()=>{
    return z.object({
    email: z.string().email({
        message: "Please enter a valid email.",
      }),
    password: z.string().min(8,{
        message: "Password must be at least 8 characters.",
      }).max(20),
})
}

function SignIn() {
  const navigate=useNavigate();
    const formschema=signinformSchema();
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
  function onSubmit(values) {
    try {
        console.log(values.email);
        form.reset();
        toast.success("Signed in successfully!");
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
    <p className='text-base-100 text-center'>Don't have an account? <Link to="/signup" className='text-blue-500 underline font-bold'>Sign Up</Link></p>
    </div>
    </div>
    </div>
  )
}

export default SignIn