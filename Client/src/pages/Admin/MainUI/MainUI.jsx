import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminCommonPanel from '../../../components/AdminCommonPanel';
import AddGroup from '../GroupRelated/AddGroup';

const MainUI = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            {/* <div className='w-full bg-gray-200 text-center p-4 text-4xl font-bold'>Admin Panel</div>
        <br /><br /><br /><br />
        <div className='grid grid-cols-2 gap-12 mt-16 px-4 py-2 m-auto w-3/4'>
            <center>
                <button className='bg-red-500 shadow-lg shadow-red-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={()=>navigate('/Admin/Group/AddGroup')}>Add Group</button>
            </center>
            <center>
                <button className='bg-cyan-500 shadow-lg shadow-cyan-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={()=>navigate('/Admin/Group/AddTypeOfTesting')}>Add Type Of Testing</button>
            </center>
            <center>
                <button className='bg-indigo-500 shadow-lg shadow-indigo-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={()=>navigate('/Admin/Group/AddTests')}>Add Tests</button>
            </center>
            <center>
                <button className='bg-blue-500 shadow-lg shadow-blue-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal'>Add Substance</button>
            </center>
        </div> */}

            <div className="flex items-center justify-between p-4 shadow-md bg-slate-400 border border-slate-700 border-2">
                <div className="flex items-center">
                    <img src=" /src/assets/images/DRDO-Logo1.jpg" alt="Logo"
                        className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
                    />
                    <span className="text-lg font-bold">Name of Lab : DFRL</span>
                </div>
                <div className='mx-6'>
                    <select name="" id="" className="p-2 rounded-lg border border-blue-800 bg-slate-100">
                        <option value="admin">Administrator</option>
                        <option value="change-password">Change Password</option>
                        <option value="logout" className='text-red-500'>Log Out!</option>
                    </select>
                </div>
            </div>

            <div className='flex'>
                {/* Left Panel  */}
                <AdminCommonPanel />

                {/* Right Section */}
                <div className="bg-red-100 w-full">
                <h1 className='text-center text-3xl font-semibold pt-52'>Welcome Admin</h1>
                </div>
            </div>
        </div>
    )
}

export default MainUI