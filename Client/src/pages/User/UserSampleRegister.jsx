import React from 'react'
import { useNavigate } from 'react-router-dom';
import UserCommonNav from '../../components/UserCommonNav';

const UserSampleRegister = () => {
  const navigate = useNavigate();
  const handleSampleHistoryPage = () => {
    navigate('/SampleRegistrationUser/SampleHistory')
  }
  const handleSampleRegister = () => {
    navigate('/SampleRegister')
  }
  return (
    <>
      <div className="w-screen h-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
        <UserCommonNav assignedRole='Sample Registration'/>
        <br /><br /><br /><br /><br />
        <div className='grid gap-12 mt-16 px-4 py-2 m-auto w-3/4'>
          <center>
            <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-800 w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handleSampleRegister}>
              Sample Register
            </button>
          </center>
          <center>
            <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-800 w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handleSampleHistoryPage}>
              Sample History Page
            </button>
          </center>
        </div>
      </div>
    </>
  )
}

export default UserSampleRegister
