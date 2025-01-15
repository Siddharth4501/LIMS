import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';

const AdminCommonPanel = () => {
    const [openMenu, setOpenMenu] = useState('');

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? '' : menu);
    };
    
    return (
        <div>
            <div className='h-screen w-64 bg-gray-200 shadow-lg'>
                <div>
                    <div className='w-full p-4 hover:bg-gray-300'>
                        Dr. G. Phanu Kumar
                    </div>
                    <div className='cursor-pointer'>
                        <button
                            className="w-full flex justify-between items-center p-4 hover:bg-gray-300"
                            onClick={() => toggleMenu('masterList')}
                        >
                            <span>Master List</span>
                            <span>&gt;</span>
                        </button>
                        {openMenu === 'masterList' && (
                            <div className="pl-6">
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Group/GroupList'}>Group List</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Group/TypeOfTestingList'}>Type Of Testing List</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Group/TestsList'}>Tests List</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Group/AddMethod'}>Method List</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Group/AddUnit'}>Unit List</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Error/AddError'}>Error List</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/User/UserList'}>User List</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/User/DeletedUserList'}>Deleted User List</NavLink></p>
                            </div>
                        )}
                    </div>
                    <div className='cursor-pointer'>
                        <button
                            className="w-full flex justify-between items-center p-4 hover:bg-gray-300"
                            onClick={() => toggleMenu('sampleRegistration')}
                        >
                            <span>Sample Registration</span>
                            <span>&gt;</span>
                        </button>
                        {openMenu === 'sampleRegistration' && (
                            <div className="pl-6">
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Sample/AllSampleHistory'}>Registered Samples</NavLink></p>
                                <p className="p-2 hover:bg-gray-300"><NavLink to={'/Admin/Sample/DeletedSampleHistory'}>Deleted Samples</NavLink></p>
                            </div>
                        )}
                    </div>
                    <div className='cursor-pointer'>
                        <button
                            className="w-full flex justify-between items-center p-4 hover:bg-gray-300"
                            onClick={() => toggleMenu('administration')}
                        >
                            <span>Administration</span>
                            <span>&gt;</span>
                        </button>
                        {openMenu === 'administration' && (
                            <div className="pl-6">
                                <p className="p-2 hover:bg-gray-300">Logo</p>
                                <p className="p-2 hover:bg-gray-300">Name of Lab</p>
                                <p className="p-2 hover:bg-gray-300">Self Profile</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCommonPanel
