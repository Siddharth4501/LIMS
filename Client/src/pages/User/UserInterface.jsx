import React from 'react';

import UserCommonNav from '../../components/UserCommonNav.jsx';
const UserInterface = () => {
    
    return (
        <div className="w-screen bg-no-repeat h-screen">
            <UserCommonNav/>
            <div className=" min-h-[84vh] w-screen bg-[url('/src/assets/images/LIMS-BACK4.webp')] bg-cover bg-top">   
            </div>
        </div>
    );
};

export default UserInterface;

