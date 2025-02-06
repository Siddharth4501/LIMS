import React from 'react'
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { AdminRegister, login } from "../../Redux/Slices/AuthSlice";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const AdminUserRegister = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // Validation Functions
    const validateUserName = (name) => {
        if (!name.trim()) return "User Name is required.";
        if (name.length < 3) return "User Name must be at least 3 characters.";
        return "";
    };

    const validateUserEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) return "Email is required.";
        if (!emailRegex.test(email)) return "Enter a valid email.";
        return "";
    };

    const validateUserPassword = (password) => {
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const lowercaseRegex = /[a-z]/;
        const uppercaseStartRegex = /^[A-Z]/;

        if (!password) {
            return "Password is required.";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters.";
        }
        if (!uppercaseStartRegex.test(password)) {
            return "Password must start with a capital letter.";
        }
        if (!specialCharacterRegex.test(password)) {
            return "Password must contain at least one special character.";
        }
        if (!lowercaseRegex.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        return "";
    };
    const validateUserVerificationPassword = (password) => {
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const lowercaseRegex = /[a-z]/;
        const uppercaseStartRegex = /^[A-Z]/;

        if (!password) {
            return "Verification Password is required.";
        }
        if (password.length < 6) {
            return "Verification Password must be at least 6 characters.";
        }
        if (!uppercaseStartRegex.test(password)) {
            return "Verification Password must start with a capital letter.";
        }
        if (!specialCharacterRegex.test(password)) {
            return "Verification Password must contain at least one special character.";
        }
        if (!lowercaseRegex.test(password)) {
            return "Verification Password must contain at least one lowercase letter.";
        }
        return "";
    };
    //functon to login
    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const formData=new FormData(e.target);
        const fullName=formData.get("fullName");
        const email = formData.get("Email");
        const password = formData.get("Password");
        const verificationPassword=formData.get("verificationPassword");
    
        // Validate fields
        if (!email || !password || !verificationPassword || !fullName) {
            toast.error("Please fill all the fields");
            return;
        }
        const userNameError = validateUserName(fullName);
        const userEmailError = validateUserEmail(email);
        const userPasswordError = validateUserPassword(password);
        const userVerificationPasswordError = validateUserVerificationPassword(verificationPassword);

        if (userNameError || userEmailError || userPasswordError || userVerificationPasswordError) {
            if (userNameError) toast.error(userNameError);
            if (userEmailError) toast.error(userEmailError);
            if (userPasswordError) toast.error(userPasswordError);
            if (userVerificationPasswordError) toast.error(userVerificationPasswordError);
            return;
        }
        const registerData = {
            fullName,
            email,
            password,
            verificationPassword
        };
    
        try {
            // Dispatch login action
            const res = await dispatch(AdminRegister(registerData));
            if (res?.payload?.success) {
                toast.success("Admin Registration Successful");
                navigate("/");
            }
            else{
                toast.error("Something Went Wrong");
            } 
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };
  return (
    <div className="flex flex-col min-h-screen w-screen justify-center bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed ">
            <div className='bg-gray-400 pt-6  xl:w-1/3 lg:w-1/2 w-3/4 lg:h-[650px] h-[750px] mx-auto rounded-2xl border-gray-800 border-2'>
                <form onSubmit={handleLogin} className='grid border-gray-300 border-2 shadow-[0_0_10px_black] rounded-lg lg:h-[600px] h-[700px] w-4/5 m-auto p-4 bg-gray-200'>
                    <center><h1 className='text-3xl font-bold'>ADMIN REGISTERATION</h1></center>
                    <div className='w-full md:p-2 '>
                        <div className='flex justify-center mx-auto'><FaRegUserCircle size={125} className='bg-gray-300 rounded-full' /></div>
                    </div>
                    <div className='w-full md:p-2 flex flex-col gap-2'>
                        <div className='flex mx-auto'>
                            <span className='pt-2 p-1'><MdDriveFileRenameOutline /></span>
                            <label htmlFor="Email" className='w-full text-lg font-bold'>Name:</label>
                        </div>
                        <div className=' w-full'>
                            <input type="text" name="fullName" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your Name..." />
                        </div>
                        
                    </div>
                    <div className='w-full md:p-2 flex flex-col gap-2'>
                        <div className='flex mx-auto'>
                            <span className='pt-2 p-1'><MdEmail /></span>
                            <label htmlFor="Email" className='w-full text-lg font-bold'>Email:</label>
                        </div>
                        <div className=' w-full'>
                            <input type="email" name="Email" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your email..." />
                        </div>
                        
                    </div>
                    <div className='w-full md:p-2 flex flex-col gap-2'>
                        <div className='flex mx-auto'>
                            <span className='pt-2 p-1'><RiLockPasswordFill /></span>
                            <label htmlFor="Password" className='w-full text-lg font-bold'>Password:</label>
                        </div>
                        <div className='w-full'>
                            <input type="password" name="Password" id="Password" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your password..." />
                        </div>
                    </div>
                    <div className='w-full md:p-2 flex flex-col gap-2'>
                        <div className='flex mx-auto'>
                            <span className='pt-2 p-1'><RiLockPasswordFill /></span>
                            <label htmlFor="Password" className='w-full text-lg font-bold'>Verification Password:</label>
                        </div>
                        <div className='w-full'>
                            <input type="password" name="verificationPassword" id="verificationPassword" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter Verification password..." />
                        </div>
                    </div>
                    <div className='w-full mt-5'>
                        <button type="submit" className='bg-indigo-700 rounded-md text-white w-3/4 py-1 flex justify-center mx-auto hover:bg-indigo-800 font-semibold'>Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
  )
}

export default AdminUserRegister