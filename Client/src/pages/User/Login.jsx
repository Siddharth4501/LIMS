import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { login } from "../../Redux/Slices/AuthSlice";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    //functon to login
    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const email = e.target[0].value;
        const password = e.target[1].value;
    
        // Validate fields
        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
    
        const loginData = {
            email,
            password,
        };
    
        try {
            // Dispatch login action
            const res = await dispatch(login(loginData));
    
            if (res?.payload?.success) {
                const UserData = JSON.parse(localStorage.getItem('userData') || '{}');
    
                if (UserData?.roles) {
                    // Navigate based on user roles
                    if (UserData.roles.some((role) => role.designation !== 'Admin')) {
                        navigate("/");
                    } else if (UserData.roles.some((role) => role.designation === 'Admin')) {
                        navigate("/Admin/Home");
                    }
                } else {
                    toast.error("User data not found or invalid roles");
                }
            } else {
                // Handle login failure
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };
    
  return (
    <div className="flex flex-col font-bold min-h-screen w-screen justify-center bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center ">
        <form onSubmit={handleLogin} className='grid gap-2 border-blue-600 shadow-blue-500/50 border-2 shadow-[0_0_6px_gray] rounded-lg h-96 xl:w-2/5 w-4/5 m-auto p-4 bg-gray-200'>
            <center><h1 className='text-4xl'>Login</h1></center>
            <div className='w-full p-2 pt-5 flex sm:flex-row flex-col'>
                <div className='flex w-1/4 mx-auto'>
                    <span className='pt-2 p-1'><MdEmail /></span>
                    <label htmlFor="Email" className='w-full text-xl'>Email:</label>
                </div>
                <div className='sm:w-3/4 w-full'>
                    <input type="email" name="Email" className='w-full h-8 rounded-3xl pl-4 border-2 border-blue-600 outline-0' placeholder="Enter your email..." />
                </div>
                
            </div>
            <div className='relative w-full p-2 pt-5 flex sm:flex-row flex-col'>
                <div className='flex w-1/4  mx-auto'>
                    <span className='pt-2 p-1'><RiLockPasswordFill /></span>
                    <label htmlFor="Password" className='w-full text-xl'>Password:</label>
                </div>
                <div className='sm:w-3/4 w-full'>
                    <input type="password" name="Password" id="" className='w-full h-8 rounded-3xl pl-4 border-2 border-blue-600 outline-0' placeholder="Enter your password..." />
                </div>
            </div>
            <div className='w-full'>
                <button type="submit" className='bg-indigo-700 rounded-md text-white w-1/4 py-1 flex justify-center mx-auto hover:bg-indigo-800'>Submit</button>
            </div>
        </form>
        
    </div>
  )
}

export default Login