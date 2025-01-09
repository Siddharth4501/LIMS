import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const UserInterface = () => {
    const userData=JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const handleChange = (event) => {
        const role = event.target.value;
        setSelectedRole(role); // Update the selected role
        navigate(`/${role}/Home`,{state:role}); // Navigate to the dynamic route
    };
    return (
        <div className="flex items-center justify-between p-4 shadow-md bg-slate-300">

            <div className="flex items-center">
                <img src=" /src/assets/images/DRDO-Logo1.jpg" alt="Logo"
                    className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
                />
                <span className="text-lg font-bold">Name of Lab : DFRL</span>
            </div>

            <div className='flex '>
                <h2 className='pt-2 text-teal-900 font-bold'>Change Role</h2>
                <div className='px-2 mr-6'>
                    <select name="" id="" className="p-2 rounded-lg border border-blue-300 bg-slate-100" value={selectedRole} onChange={handleChange}>
                        <option value="" className='cursor-not-allowed' disabled>Select a role</option>
                        {
                            userData.roles.map((item)=>{
                                return <option value={item.designation} key={item._id}>{item.designation}</option>
                            })
                        }
                    </select>
                </div>

                <div className='mx-6'>
                    <select name="" id="" className="p-2 rounded-lg border border-blue-300 bg-slate-100">
                        <option value={userData.fullName}>{userData.fullName}</option>
                        <option value="change-password">Change Password</option>
                        <option value="logout" className='text-red-500'>Log Out!</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default UserInterface;

