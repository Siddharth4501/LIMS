import React, { Children, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Login = () => {
    const [showPassword,setShowPassword]=useState(false);
    const handlePasswordToggle=()=>{
        setShowPassword((prevState)=>!prevState);
    }
  return (
    <div className='flex flex-col font-bold h-screen w-screen justify-center'>
        <center><h1 className='text-4xl italic bg-gray-300 p-3'>Login Page</h1></center>
        <form className='grid gap-2 border border-gray-700 rounded-lg h-80 w-1/3 m-auto p-4 bg-gray-300'>
            <div className='w-full p-2 pt-5 flex'>
                <span className='pt-2 p-1'><MdEmail /></span>
                <label htmlFor="Email" className='w-1/4 text-xl'>Email:</label>
                <input type="email" name="Email" className='w-3/4 h-8 rounded-3xl' />
            </div>
            <div className='relative w-full p-2 pt-5 flex'>
                <span className='pt-2 p-1'><RiLockPasswordFill /></span>
                <label htmlFor="Password" className='w-1/4 text-xl'>Password:</label>
                <input type={showPassword?'text':'password'} name="Password" id="" className='w-3/4 h-8 rounded-3xl' />
                <span className='absolute right-3 top-1/4 transform-translate-y-1/2'><button type="button" onClick={handlePasswordToggle}>{showPassword ? <FaEye />:<FaEyeSlash />}</button></span>
            </div>
            <div className='w-full'>
                <button type="submit" className='bg-indigo-700 rounded-md text-white pl-4 pr-4 pb-1 pt-1 flex justify-center mx-auto hover:bg-indigo-800'>Submit</button>
            </div>
        </form>
        
    </div>
  )
}

export default Login