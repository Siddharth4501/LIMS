import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Slices/AuthSlice';
import {useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
const UserInterface = () => {
    const userData=JSON.parse(localStorage.getItem('userData'));
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const handleChange = (event) => {
        const role = event.target.value;
        setSelectedRole(role); // Update the selected role
        navigate(`/${role}/Home`); // Navigate to the dynamic route
    };
    const handleLogout=async(e)=>{
        const value=e.target.value;
        if(value==='logout'){
            const res=await dispatch(logout())
            if(res?.payload?.success){
                navigate('/Login')
                toast.success("Successfully Logged Out");
                
            }
            else{
                toast.error("Something Went Wrong");
            }
        }
    else if(value=='change-password')
        navigate('/User/Change-Password')
    }
    return (
        <div className="w-screen bg-no-repeat h-screen">

            <div className="flex sm:flex-row flex-col items-center justify-between p-4 shadow-md bg-slate-500 border border-2 border-slate-800">

                <div className="flex items-center">
                    <img src=" /src/assets/images/DIBT.jpg" alt="Logo"
                        className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
                    />
                    <span className="text-lg font-bold">Name of Lab : DFRL</span>
                </div>

                <div className='flex sm:flex-row flex-col '>
                    <h2 className='pt-2 text-gray-800 text-lg font-bold sm:mx-0 mx-auto'>Change Role</h2>
                    <div className='px-2 mr-6 sm:ml-0 ml-5 mb-1'>
                        <select name="" id="" className="p-2 rounded-lg border-2 outline-0 border-blue-600" value={selectedRole} onChange={handleChange}>
                            <option value="" className='cursor-not-allowed' disabled>Select a role</option>
                            {
                                userData.roles.map((item)=>{
                                    return <option value={item.designation} key={item._id}>{item.designation}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='sm:mx-6 mx-auto'>
                        <select name="" id="" className="p-2 rounded-lg border-2 outline-0 border-blue-600" onChange={handleLogout}>
                            <option value={userData.fullName}>{userData.fullName.toUpperCase()}</option>
                            <option value="change-password">Change Password</option>
                            <option value="logout" className='text-red-500'>Log Out!</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className=" min-h-[84vh] w-screen bg-[url('/src/assets/images/LIMS-BACK4.webp')] bg-cover bg-top">
                
            </div>
        </div>
    );
};

export default UserInterface;

