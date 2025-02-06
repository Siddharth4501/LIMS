import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { login } from "../../Redux/Slices/AuthSlice";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    //functon to login
    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target);
        const email = formData.get("Email");
        const password = formData.get("Password");
    
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
    <div className="flex flex-col min-h-screen w-screen justify-center bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed ">
        <div className='bg-gray-400 pt-6  xl:w-1/3 lg:w-1/2 w-3/4 lg:h-[550px] h-[750px] mx-auto rounded-2xl border-gray-800 border-2'>
            <form onSubmit={handleLogin} className='grid border-gray-300 border-2 shadow-[0_0_10px_black] rounded-lg lg:h-[500px] h-[700px] w-4/5 m-auto p-4 bg-gray-200'>
                <center><h1 className='text-4xl font-bold'>LIMS LOGIN</h1></center>
                <div className='w-full md:p-2 '>
                    <div className='flex justify-center mx-auto'><FaRegUserCircle size={150} className='bg-gray-300 rounded-full' /></div>
                </div>
                <div className='w-full md:p-2 flex flex-col gap-2'>
                    <div className='flex mx-auto'>
                        <span className='pt-2 p-1'><MdEmail /></span>
                        <label htmlFor="Email" className='w-full text-xl font-bold'>Email:</label>
                    </div>
                    <div className=' w-full'>
                        <input type="email" name="Email" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your email..." />
                    </div>
                    
                </div>
                <div className='w-full md:p-2 flex flex-col gap-2'>
                    <div className='flex mx-auto'>
                        <span className='pt-2 p-1'><RiLockPasswordFill /></span>
                        <label htmlFor="Password" className='w-full text-xl font-bold'>Password:</label>
                    </div>
                    <div className='w-full'>
                        <input type="password" name="Password" id="" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your password..." />
                    </div>
                </div>
                <div className='w-full mt-3'>
                    <button type="submit" className='bg-indigo-700 rounded-md text-white w-3/4 py-1 flex justify-center mx-auto hover:bg-indigo-800 font-semibold'>Submit</button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default Login