import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Slices/AuthSlice";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //functon to login
    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.target);
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
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed ">
                <div className="bg-gray-100 shadow-lg rounded-xl p-8 w-full max-w-md  border border-black">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">LIMS LOGIN</h1>
                    <div className="flex justify-center mb-4">
                        <FaUserCircle size={125} className='text-gray-600' />
                    </div>
                    <form onSubmit={handleLogin} className='space-y-4'>
                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative mt-1">
                                <MdEmail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                <input type="email" name="Email" className='w-full pl-10 pr-3 py-2 border rounded-lg outline-0 border-black' placeholder="Enter your email..." />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative mt-1">
                                <RiLockPasswordFill className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                                <input type="password" name="Password" className='w-full pl-10 pr-3 py-2 border rounded-lg outline-0 border-black' placeholder="Enter your password..." />
                            </div>
                        </div>
                        <button type="submit" className='w-full bg-indigo-800 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login