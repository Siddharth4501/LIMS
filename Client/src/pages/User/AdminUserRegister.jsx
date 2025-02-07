
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