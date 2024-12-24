import React from 'react'
import { useNavigate } from 'react-router-dom'

const TM_Home = () => {
    const navigate=useNavigate();

    return (
        <>
            <h1 className='font-bold text-3xl text-center m-4 py-4'>TECHNICAL MANAGER </h1>
            <div className='grid grid-cols-2 gap-12 mt-16 px-4 py-2 m-auto w-3/4'>
                <center>
                    <button className='bg-red-500 shadow-lg shadow-red-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={()=>navigate('/')}>Sample Allotment</button>
                </center>
                <center>
                    <button className='bg-cyan-500 shadow-lg shadow-cyan-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={navigate('/')}>Result Approved !!</button>
                </center>
                <center>
                    <button className='bg-indigo-500 shadow-lg shadow-indigo-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={navigate('/')}>Pending Samples !!</button>
                </center>
                <center>
                    <button className='bg-blue-500 shadow-lg shadow-blue-500/50 w-80 px-4 py-2 rounded-md text-2xl font-normal' onClick={navigate('/')}>Approved Result</button>
                </center>
            </div>
        </>
    )
}

export default TM_Home
