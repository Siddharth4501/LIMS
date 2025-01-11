import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainUI = () => {
    const navigate=useNavigate();
  return (
    <div>
        <div className='w-full bg-gray-200 text-center p-4 text-4xl font-bold'>Admin Panel</div>
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
        </div>
    </div>
  )
}

export default MainUI