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
                <div className='w-full bg-[url("/src/assets/images/AdminBack4.jpg")] bg-cover bg-no-repeat bg-bottom' style={{ backgroundColor: "rgba(0, 0, 0, 0.2)",backgroundBlendMode: "darken"}}>
                </div>
            </div>
        </div>
    )
}

export default MainUI