import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const AdminCommonPanel = () => {
    const userData=JSON.parse(localStorage.getItem('userData'));
    const [openMenu, setOpenMenu] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate=useNavigate();
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? "" : menu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
        <div className="flex">
            {/* fixed top-[115px] left-0 z-50 */}
            <div
                className={`min-h-[84vh] bg-gray-200 opacity-95 shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-12"
                    }`}
            >
                {/* Hamburger Button */}
                <div
                    className="pl-1 pr-3 py-4 cursor-pointer float-right"
                    onClick={toggleSidebar}
                >
                    <div className="space-y-1">
                        <div className="w-6 h-1 bg-gray-800"></div>
                        <div className="w-6 h-1 bg-gray-800"></div>
                        <div className="w-6 h-1 bg-gray-800"></div>
                    </div>
                </div>

                {isSidebarOpen && (
                    <div>
                        <div className="w-full p-4 hover:bg-gray-300">
                            {userData.fullName.toUpperCase()}
                        </div>
                        <div className="cursor-pointer">
                            <button
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-300"
                                onClick={() => toggleMenu("masterList")}
                            >
                                <span>Master List</span>
                                <span>&gt;</span>
                            </button>
                            {openMenu === "masterList" && (
                                <div className="pl-6">
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Group/GroupList')}>
                                        Group List
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Group/TypeOfTestingList')}>
                                        Type Of Testing List
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Group/TestsList')}>
                                        Tests List
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Substance/MethodList')}>
                                        Method List
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Error/ErrorList')}>
                                        Error List
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/User/UserList')}>
                                        User List
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/User/DeletedUserList')}>
                                        Deleted User List
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer">
                            <button
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-300"
                                onClick={() => toggleMenu("sampleRegistration")}
                            >
                                <span>Sample Registration</span>
                                <span>&gt;</span>
                            </button>
                            {openMenu === "sampleRegistration" && (
                                <div className="pl-6">
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Sample/AllSampleHistory')}>
                                        Registered Samples
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Sample/DeletedSampleHistory')}>
                                        Deleted Samples
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer">
                            <button
                                className="w-full flex justify-between items-center p-4 hover:bg-gray-300"
                                onClick={() => toggleMenu("administration")}
                            >
                                <span>Administration</span>
                                <span>&gt;</span>
                            </button>
                            {openMenu === "administration" && (
                                <div className="pl-6">
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Administration/Logo')}>
                                        Logo
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Administration/NameOfLab')}>
                                        Name Of Lab
                                    </button>
                                    <button className="p-2 hover:bg-gray-300 w-full text-start" onClick={()=>navigate('/Admin/Administration/AdminProfile')}>
                                        Self Profile
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default AdminCommonPanel;

