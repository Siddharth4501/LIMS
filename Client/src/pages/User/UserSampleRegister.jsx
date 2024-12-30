import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserSampleRegister = () => {
  const navigate=useNavigate();
    const handleSampleHistoryPage=()=>{
        navigate('/AllSampleHistory')
    }
    const handleSampleRegister=()=>{
      navigate('/SampleRegister')
  }
  return (
    <>
    <div>
    <h1 className='text-center font-medium text-3xl p-4 text-teal-800 bg-green-100'>Sample Registration User</h1>
    </div>
      <div className="flex items-center justify-between p-4 shadow-md">
        <div className="flex items-center">
          <img src=" https://via.placeholder.com/300" alt="Logo"
            className="h-12 w-12 object-contain mr-8 ml-4 rounded-full"
          />
          <span className="text-lg font-bold">Name of Lab</span>
        </div>
        <div className='mx-6'>
          <select name="" id="" className="p-2 rounded-lg border border-blue-300">
            <option value="name">Great Khali</option>
            <option value="change-password">Change Password</option>
            <option value="logout" className='text-red-500'>Log Out!</option>
          </select>
        </div>

      </div>
      <div className='grid grid-cols-2 gap-12 mt-16 px-4 py-2 m-auto w-3/4'>
        <center>
          <button className='bg-red-500 shadow-lg shadow-red-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={handleSampleRegister}>Sample Register</button>
        </center>
        <center>
          <button className='bg-cyan-500 shadow-lg shadow-cyan-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={handleSampleHistoryPage}>Sample History Page</button>
        </center>
      </div>
    </>
  )
}

export default UserSampleRegister
