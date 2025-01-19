import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminCommonPanel from '../../../components/AdminCommonPanel';
import AddGroup from '../GroupRelated/AddGroup';
import AdminCommomNav from '../../../components/AdminCommomNav';

const MainUI = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AdminCommomNav />
            <div className='flex'>
                {/* Left Panel  */}
                <AdminCommonPanel />

                {/* Right Section */}
                <div className='w-full bg-red-100'>
                    <h1 className='text-center text-3xl font-semibold pt-52'>Welcome Admin</h1>
                </div>
            </div>
        </div>
    )
}

export default MainUI