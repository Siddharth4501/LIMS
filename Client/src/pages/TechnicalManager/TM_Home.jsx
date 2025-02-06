import React from 'react'
import { useNavigate } from 'react-router-dom'
import UserCommonNav from '../../components/UserCommonNav';

const TM_Home = () => {
    const navigate = useNavigate();
    const handleSampleAllotment = () => {
        navigate('/SampleAllotment')
    }
    const handleResultApproval = () => {
        navigate('/ResultApproval')
    }
    const handlePendingSample = () => {
        navigate('/TM_PendingSamples')
    }
    const handleApprovedResult = () => {
        navigate('/ResultApproved')
    }

    return (
        <>
            <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
                <UserCommonNav assignedRole='Technical Manager'/>
                <br /><br /><br />
                <div className='grid gap-12 mt-16 px-4 py-2 m-auto w-3/4'>
                    <center>
                        <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-800 w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handleSampleAllotment}>
                            Sample Allotment
                        </button>
                    </center>
                    <center>
                        <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-800 w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handleResultApproval}>
                            Result Approval !!
                        </button>
                    </center>
                    <center>
                        <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-800  w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handlePendingSample}>
                            Pending Samples !!
                        </button>
                    </center>
                    <center>
                        <button className='bg-indigo-700 shadow-lg text-white hover:bg-indigo-800  w-80 px-4 py-2 rounded-md text-2xl font-normal transition-transform duration-300 ease-in-out hover:scale-105' onClick={handleApprovedResult}>
                            Approved Result
                        </button>
                    </center>

                </div>
            </div>
        </>
    )
}

export default TM_Home
