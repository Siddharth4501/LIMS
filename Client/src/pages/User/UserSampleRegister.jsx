import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from '../../Redux/Slices/AuthSlice';

const UserSampleRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const handleSampleHistoryPage = () => {
    navigate('/SampleRegistrationUser/SampleHistory')
  }
  const handleSampleRegister = () => {
    navigate('/SampleRegister')
  }
  const handleRedirection = async (e) => {
    const value = e.target.value;
    if (value === 'User Home') {
      navigate('/')
    }
    else if (value === 'logout') {
      const res = await dispatch(logout())
      if (res?.payload?.success) {
        navigate('/Login')
        toast.success("Successfully Logged Out");

      }
      else {
        toast.error("Something Went Wrong");
      }
    }
    else if (value == 'change-password') {
      navigate('/User/Change-Password')
    }
  }
  return (
    <>
      <div className="w-screen h-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center">
        <div className="flex items-center justify-between p-4 shadow-md bg-slate-400 border border-2 border-slate-700">
          <div className="flex items-center">
            <img src="/src/assets/images/DRDO-Logo1.jpg" alt="Logo"
              className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
              />
            <span className="text-lg font-bold">Name of Lab: DFRL</span>
          </div>
          <div>
            <h1 className='text-center font-medium text-3xl p-4'>Sample Registration</h1>
          </div>
          <div className='mx-6'>
            <select name="" id="" className="p-2 rounded-lg border border-blue-800 bg-slate-100" onChange={handleRedirection}>
              <option value="name">{userData.fullName.toUpperCase()}</option>
              <option value="User Home">Home</option>
              <option value="change-password">Change Password</option>
              <option value="logout" className='text-red-500'>Log Out!</option>
            </select>
          </div>

        </div>
        <br /><br /><br /><br /><br />
        <div className='grid gap-12 mt-16 px-4 py-2 m-auto w-3/4'>
          <center>
            <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-900 w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handleSampleRegister}>
              Sample Register
            </button>
          </center>
          <center>
            <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-900 w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handleSampleHistoryPage}>
              Sample History Page
            </button>
          </center>
        </div>
      </div>
    </>
  )
}

export default UserSampleRegister
