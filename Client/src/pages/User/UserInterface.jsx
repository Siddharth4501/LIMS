import React from 'react';

const UserInterface = () => {
    return (
        <div className="flex items-center justify-between p-4 shadow-md">

            <div className="flex items-center">
                <img src=" https://via.placeholder.com/300" alt="Logo"
                    className="h-12 w-12 object-contain mr-8 ml-4 rounded-full"
                />
                <span className="text-lg font-bold">Name of Lab</span>
            </div>

            <div className='flex '>
                    <h2 className='pt-2 text-teal-800'>Change Role</h2>
                <div className='px-2 mr-6'>
                    <select name="" id="" className="p-2 rounded-lg border border-blue-300">
                        <option value="role1">Role1</option>
                        <option value="role2">Role2</option>
                        <option value="role3">Role3</option>
                    </select>
                </div>

                <div className='mx-6'>
                    <select name="" id="" className="p-2 rounded-lg border border-blue-300">
                        <option value="name">Great Khali</option>
                        <option value="change-password">Change Password</option>
                        <option value="logout" className='text-red-500'>Log Out!</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default UserInterface;

