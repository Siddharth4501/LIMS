import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminCommomNav = () => {
    const navigate=useNavigate();
    const handleAdminNavigation=(e)=>{
        const {value}=e.target;
        console.log(value,"frt")
        if(value==="AdminHome"){
            navigate('/Admin/Home');
        }
    }
  return (
      <div className="flex items-center justify-between p-4 shadow-md bg-slate-400 border-slate-700 border-2">
                <div className="flex items-center">
                    <img src=" /src/assets/images/DRDO-Logo1.jpg" alt="Logo"
                        className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
                    />
                    <span className="text-lg font-bold">Name of Lab : DFRL</span>
                </div>
                <div className='mx-6'>
                    <select name="" id="" className="p-2 rounded-lg border border-blue-800 bg-slate-100" onChange={handleAdminNavigation}>
                        <option value="admin">Administrator</option>
                        <option value="AdminHome">Home</option>
                        <option value="change-password">Change Password</option>
                        <option value="logout" className='text-red-500'>Log Out!</option>
                    </select>
                </div>
            </div>
  )
}

export default AdminCommomNav
