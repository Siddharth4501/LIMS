import React,{useState} from 'react'

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
                                <p className="p-2 hover:bg-gray-300">Group List</p>
                                <p className="p-2 hover:bg-gray-300">Type of Testing List</p>
                                <p className="p-2 hover:bg-gray-300">Tests List</p>
                                <p className="p-2 hover:bg-gray-300">Method List</p>
                                <p className="p-2 hover:bg-gray-300">Unit List</p>
                                <p className="p-2 hover:bg-gray-300">Error List</p>
                                <p className="p-2 hover:bg-gray-300">User List</p>
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
                                <p className="p-2 hover:bg-gray-300">Registered Samples</p>
                                <p className="p-2 hover:bg-gray-300">Deleted Samples</p>
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
