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
        <div className="w-screen bg-no-repeat h-screen bg-gray-100">

            <div className="flex items-center justify-between p-4 shadow-md bg-slate-400 border border-2 border-slate-700">

                <div className="flex items-center">
                    <img src=" /src/assets/images/DRDO-Logo1.jpg" alt="Logo"
                        className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
                    />
                    <span className="text-lg font-bold">Name of Lab : DFRL</span>
                </div>

                <div className='flex '>
                    <h2 className='pt-2 text-teal-900 font-bold'>Change Role</h2>
                    <div className='px-2 mr-6'>
                        <select name="" id="" className="p-2 rounded-lg border border-blue-800 bg-slate-100" value={selectedRole} onChange={handleChange}>
                            <option value="" className='cursor-not-allowed' disabled>Select a role</option>
                            {
                                userData.roles.map((item)=>{
                                    return <option value={item.designation} key={item._id}>{item.designation}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='mx-6'>
                        <select name="" id="" className="p-2 rounded-lg border border-blue-800 bg-slate-100" onChange={handleLogout}>
                            <option value={userData.fullName}>{userData.fullName.toUpperCase()}</option>
                            <option value="change-password">Change Password</option>
                            <option value="logout" className='text-red-500'>Log Out!</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className=" h-[68vh] w-[96vw] mt-20 ml-5 bg-[url('/src/assets/images/DFRL.jpg')] bg-contain bg-no-repeat bg-center">
                
            </div>
        </div>
    );
};

export default UserInterface;

