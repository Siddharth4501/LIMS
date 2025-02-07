// import React from 'react'
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import {  useNavigate } from "react-router-dom";
// import { AdminRegister, login } from "../../Redux/Slices/AuthSlice";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { FaRegUserCircle } from "react-icons/fa";
// import { MdDriveFileRenameOutline } from "react-icons/md";

// const AdminUserRegister = () => {
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     // Validation Functions
//     const validateUserName = (name) => {
//         if (!name.trim()) return "User Name is required.";
//         if (name.length < 3) return "User Name must be at least 3 characters.";
//         return "";
//     };

//     const validateUserEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email.trim()) return "Email is required.";
//         if (!emailRegex.test(email)) return "Enter a valid email.";
//         return "";
//     };

//     const validateUserPassword = (password) => {
//         const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
//         const lowercaseRegex = /[a-z]/;
//         const uppercaseStartRegex = /^[A-Z]/;

//         if (!password) {
//             return "Password is required.";
//         }
//         if (password.length < 6) {
//             return "Password must be at least 6 characters.";
//         }
//         if (!uppercaseStartRegex.test(password)) {
//             return "Password must start with a capital letter.";
//         }
//         if (!specialCharacterRegex.test(password)) {
//             return "Password must contain at least one special character.";
//         }
//         if (!lowercaseRegex.test(password)) {
//             return "Password must contain at least one lowercase letter.";
//         }
//         return "";
//     };
//     const validateUserVerificationPassword = (password) => {
//         const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
//         const lowercaseRegex = /[a-z]/;
//         const uppercaseStartRegex = /^[A-Z]/;

//         if (!password) {
//             return "Verification Password is required.";
//         }
//         if (password.length < 6) {
//             return "Verification Password must be at least 6 characters.";
//         }
//         if (!uppercaseStartRegex.test(password)) {
//             return "Verification Password must start with a capital letter.";
//         }
//         if (!specialCharacterRegex.test(password)) {
//             return "Verification Password must contain at least one special character.";
//         }
//         if (!lowercaseRegex.test(password)) {
//             return "Verification Password must contain at least one lowercase letter.";
//         }
//         return "";
//     };
//     //functon to login
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         const formData=new FormData(e.target);
//         const fullName=formData.get("fullName");
//         const email = formData.get("Email");
//         const password = formData.get("Password");
//         const verificationPassword=formData.get("verificationPassword");
    
//         // Validate fields
//         if (!email || !password || !verificationPassword || !fullName) {
//             toast.error("Please fill all the fields");
//             return;
//         }
//         const userNameError = validateUserName(fullName);
//         const userEmailError = validateUserEmail(email);
//         const userPasswordError = validateUserPassword(password);
//         const userVerificationPasswordError = validateUserVerificationPassword(verificationPassword);

//         if (userNameError || userEmailError || userPasswordError || userVerificationPasswordError) {
//             if (userNameError) toast.error(userNameError);
//             if (userEmailError) toast.error(userEmailError);
//             if (userPasswordError) toast.error(userPasswordError);
//             if (userVerificationPasswordError) toast.error(userVerificationPasswordError);
//             return;
//         }
//         const registerData = {
//             fullName,
//             email,
//             password,
//             verificationPassword
//         };
    
//         try {
//             // Dispatch login action
//             const res = await dispatch(AdminRegister(registerData));
//             if (res?.payload?.success) {
//                 toast.success("Admin Registration Successful");
//                 navigate("/");
//             }
//             else{
//                 toast.error("Something Went Wrong");
//             } 
//         } catch (error) {
//             toast.error("Something went wrong. Please try again.");
//         }
//     };
//   return (
//     <div className="flex flex-col min-h-screen w-screen justify-center bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed ">
//             <div className='bg-gray-400 pt-6  xl:w-1/3 lg:w-1/2 w-3/4 lg:h-[650px] h-[750px] mx-auto rounded-2xl border-gray-800 border-2'>
//                 <form onSubmit={handleLogin} className='grid border-gray-300 border-2 shadow-[0_0_10px_black] rounded-lg lg:h-[600px] h-[700px] w-4/5 m-auto p-4 bg-gray-200'>
//                     <center><h1 className='text-3xl font-bold'>ADMIN REGISTERATION</h1></center>
//                     <div className='w-full md:p-2 '>
//                         <div className='flex justify-center mx-auto'><FaRegUserCircle size={125} className='bg-gray-300 rounded-full' /></div>
//                     </div>
//                     <div className='w-full md:p-2 flex flex-col gap-2'>
//                         <div className='flex mx-auto'>
//                             <span className='pt-2 p-1'><MdDriveFileRenameOutline /></span>
//                             <label htmlFor="Email" className='w-full text-lg font-bold'>Name:</label>
//                         </div>
//                         <div className=' w-full'>
//                             <input type="text" name="fullName" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your Name..." />
//                         </div>
                        
//                     </div>
//                     <div className='w-full md:p-2 flex flex-col gap-2'>
//                         <div className='flex mx-auto'>
//                             <span className='pt-2 p-1'><MdEmail /></span>
//                             <label htmlFor="Email" className='w-full text-lg font-bold'>Email:</label>
//                         </div>
//                         <div className=' w-full'>
//                             <input type="email" name="Email" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your email..." />
//                         </div>
                        
//                     </div>
//                     <div className='w-full md:p-2 flex flex-col gap-2'>
//                         <div className='flex mx-auto'>
//                             <span className='pt-2 p-1'><RiLockPasswordFill /></span>
//                             <label htmlFor="Password" className='w-full text-lg font-bold'>Password:</label>
//                         </div>
//                         <div className='w-full'>
//                             <input type="password" name="Password" id="Password" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter your password..." />
//                         </div>
//                     </div>
//                     <div className='w-full md:p-2 flex flex-col gap-2'>
//                         <div className='flex mx-auto'>
//                             <span className='pt-2 p-1'><RiLockPasswordFill /></span>
//                             <label htmlFor="Password" className='w-full text-lg font-bold'>Verification Password:</label>
//                         </div>
//                         <div className='w-full'>
//                             <input type="password" name="verificationPassword" id="verificationPassword" className='w-full h-8 rounded pl-2 border-2 border-blue-600 outline-0 font-semibold' placeholder="Enter Verification password..." />
//                         </div>
//                     </div>
//                     <div className='w-full mt-5'>
//                         <button type="submit" className='bg-indigo-700 rounded-md text-white w-3/4 py-1 flex justify-center mx-auto hover:bg-indigo-800 font-semibold'>Submit</button>
//                     </div>
//                 </form>
//             </div>
            
//         </div>
//   )
// }

// export default AdminUserRegister





import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminRegister } from "../../Redux/Slices/AuthSlice";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const AdminUserRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        verificationPassword: ''
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const { fullName, email, password, verificationPassword } = formData;

        // Validate fields
        const userNameError = validateUserName(fullName);
        const userEmailError = validateUserEmail(email);
        const userPasswordError = validateUserPassword(password);
        const userVerificationPasswordError = validateUserPassword(verificationPassword);

        if (userNameError || userEmailError || userPasswordError || userVerificationPasswordError) {
            if (userNameError) toast.error(userNameError);
            if (userEmailError) toast.error(userEmailError);
            if (userPasswordError) toast.error(userPasswordError);
            if (userVerificationPasswordError) toast.error(userVerificationPasswordError);
            return;
        }

        if (password !== verificationPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const registerData = {
            fullName,
            email,
            password,
            verificationPassword
        };

        try {
            const res = await dispatch(AdminRegister(registerData));
            if (res?.payload?.success) {
                toast.success("Admin Registration Successful");
                navigate("/");
            } else {
                toast.error("Something Went Wrong");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
            <div className="bg-gray-100 shadow-lg rounded-xl p-8 w-full max-w-md border border-black">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">ADMIN REGISTRATION</h1>
                <div className="flex justify-center mb-4">
                    <FaUserCircle size={125} className='text-gray-600' />
                </div>
                <form onSubmit={handleRegister} className='space-y-4'>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative mt-1">
                            <MdDriveFileRenameOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className='w-full pl-10 pr-3 py-2 border rounded-lg outline-0 border-black' placeholder="Enter your full name..." />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative mt-1">
                            <MdEmail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className='w-full pl-10 pr-3 py-2 border rounded-lg outline-0 border-black' placeholder="Enter your email..." />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <RiLockPasswordFill className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className='w-full pl-10 pr-3 py-2 border rounded-lg outline-0 border-black' placeholder="Enter your password..." />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="verificationPassword" className="block text-sm font-medium text-gray-700">Verification Password</label>
                        <div className="relative mt-1">
                            <RiLockPasswordFill className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
                            <input type="password" name="verificationPassword" value={formData.verificationPassword} onChange={handleInputChange} className='w-full pl-10 pr-3 py-2 border rounded-lg outline-0 border-black' placeholder="Enter verification password..." />
                        </div>
                    </div>
                    <button type="submit" className='w-full bg-indigo-800 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default AdminUserRegister;