import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from '../../Redux/Slices/AuthSlice';

const UserSampleRegister = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=JSON.parse(localStorage.getItem('userData'));
    const handleSampleHistoryPage=()=>{
        navigate('/SampleRegistrationUser/SampleHistory')
    }
    const handleSampleRegister=()=>{
      navigate('/SampleRegister')
  }
  const handleRedirection=async(e)=>{
    const value=e.target.value;
    if(value==='User Home'){
        navigate('/')
    }
    else if(value==='logout'){
      const res=await dispatch(logout())
      if(res?.payload?.success){
        navigate('/Login')
        toast.success("Successfully Logged Out");
          
      }
      else{
          toast.error("Something Went Wrong");
      }
    }
    else if(value=='change-password'){
      navigate('/User/Change-Password')
    }
  }
  return (
    <>
    <div>
    </div>
      <div className="flex items-center justify-between p-4 shadow-md bg-slate-400 border border-2 border-slate-700">
        <div className="flex items-center">
          <img src="/src/assets/images/DRDO-Logo1.jpg" alt="Logo"
            className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
          />
          <span className="text-lg font-bold">Name of Lab: DFRL</span>
        </div>
        <div>
        <h1 className='text-center font-medium text-3xl p-4'>Sample Registration Page</h1>
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
      <br /><br /><br /><br /><br /><br /><br />
      <div className='grid grid-cols-2 gap-12 mt-16 px-4 py-2 m-auto w-3/4'>
        <center>
            <button className='bg-red-500  shadow-lg shadow-red-500/50 w-80 px-4 py-2 rounded-md ml-8 text-2xl font-normal border-black border-2' onClick={handleSampleRegister}>
                <div className='flex flex-col gap-3'>
                    <div className='h-32 w-32 rounded-full border-2 border-white bg-red-800 text-white flex justify-center mx-auto '><div className='flex justify-center m-auto font-bold text-2xl'>SR</div></div>
                    <div className='text-white'>Sample Register</div>
                </div>
            </button>
        </center>
        <center>
            <button className='bg-cyan-500  shadow-lg shadow-cyan-500/50 w-80 px-4 py-2 rounded-md mr-32 text-2xl font-normal border-black border-2' onClick={handleSampleHistoryPage}>
                <div className='flex flex-col gap-3'>
                    <div className='h-32 w-32 rounded-full border-2 border-white bg-cyan-800 text-white flex justify-center mx-auto '><div className='flex justify-center m-auto font-bold text-2xl'>SH</div></div>
                    <div className='text-white'>Sample History</div>
                </div>
            </button>
        </center>
      </div>
    </>
  )
}

export default UserSampleRegister
