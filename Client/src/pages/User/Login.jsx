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
    const [showPassword,setShowPassword]=useState(false);
    const handlePasswordToggle=()=>{
        setShowPassword((prevState)=>!prevState);
    }

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
    <div className="flex flex-col font-bold h-screen w-screen justify-center">
        <form onSubmit={handleLogin} className='grid gap-2 border border-indigo-800 shadow-blue-500/50 border-[3px] rounded-lg h-96 w-2/5 m-auto p-4 bg-slate-400'>
        <center><h1 className='text-4xl italic'>Login</h1></center>
            <div className='w-full p-2 pt-5 flex'>
                <span className='pt-2 p-1'><MdEmail /></span>
                <label htmlFor="Email" className='w-1/4 text-xl italic'>Email:</label>
                <input type="email" name="Email" className='w-3/4 h-8 rounded-3xl pl-4' placeholder="Enter your email..." />
            </div>
            <div className='relative w-full p-2 pt-5 flex'>
                <span className='pt-2 p-1'><RiLockPasswordFill /></span>
                <label htmlFor="Password" className='w-1/4 text-xl italic'>Password:</label>
                <input type={showPassword==true?'text':'password'} name="Password" id="" className='w-3/4 h-8 rounded-3xl pl-4' placeholder="Enter your password..." />
                <span className='absolute right-4 top-1/4 transform-translate-y-1/2 pt-1'><button type="button" onClick={handlePasswordToggle}>{showPassword==true ? <FaEye/>:<FaEyeSlash />}</button></span>
            </div>
            <div className='w-full'>
                <button type="submit" className='bg-indigo-700 rounded-md text-white w-1/4 py-1 flex justify-center mx-auto hover:bg-indigo-800'>Submit</button>
            </div>
        </form>
        
    </div>
  )
}

export default Login