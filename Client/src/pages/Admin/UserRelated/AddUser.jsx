import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGroupData } from '../../../Redux/Slices/GroupSilce';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {groupData}=useSelector((state)=>state.group);
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [groups,setGroups]=useState([]);
    useEffect(() => {
          (async () => {
            await dispatch(getGroupData());
          })();
        }, []);

    console.log(groupData)
    useEffect(()=>{
        setGroups(groupData);
    })
    const handleRoleCheckboxChange = (role) => {
        setSelectedRole(role);
    };
    const handleGroupCheckboxChange = (group) => {
        setSelectedGroup(group);
    };
    console.log(selectedGroup,selectedRole,"nghn");
  return (
    <div>
        <div className='w-full flex border bg-gray-300 border border-gray-700 shadow-[0_0_6px_gray] border-[3px] p-5'>
            <div className='w-3/5 text-3xl font-bold pr-24'><span className='float-right'>Users List</span></div>
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/User/UserList')}>Back</button></div>
        </div>
        <br /><br /><br /><br />
        <div className="p-6 bg-slate-200 flex flex-col items-center justify-center">
            <div className="w-full bg-white border border-gray-700 broder-2 shadow-lg rounded-lg p-8">
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                <input
                    type="text"
                    id="userName"
                    className="mt-1 block w-full p-2 border border-blue-500 border-2 rounded-md focus:outline-none"
                />
                </div>
                <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User Email</label>
                <input
                    type="email"
                    id="Email"
                    className="mt-1 block w-full p-2 border border-blue-500 border-2 rounded-md focus:outline-none"
                />
                </div>
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full p-2 border border-blue-500 border-2 rounded-md focus:outline-none"
                />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-2">
                <div className="border border-blue-500 border-2 rounded-md p-4 bg-gray-50">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <div>
                        <input type="checkbox" id="" className="mr-2" name="role" checked={selectedRole === "Sample Registration"}
                            onChange={() => handleRoleCheckboxChange("Sample Registration")} />
                        <label htmlFor="" className="text-gray-700">Sample Registration</label>
                    </div>
                </div>
                <div className="border border-blue-500 border-2 rounded-md p-4 bg-gray-50">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                    <div>
                        <input type="checkbox" id=""  checked={selectedGroup === 'All'} onChange={() => handleGroupCheckboxChange("All")} className="mr-2" />
                        <label htmlFor="" className="text-gray-700">All</label>
                    </div>
                </div>
                <div className="border border-blue-500 border-2 rounded-md p-4 bg-gray-50">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reporting To:</label>
                    <div className="">
                        <div>
                            <input type="checkbox" id="" className="mr-2" />
                            <label htmlFor="" className="text-gray-700">Technical Manager</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="border border-blue-500 border-2 rounded-md p-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <div className="">
                    <div>
                    <input type="checkbox" id="" className="mr-2" name="role" checked={selectedRole === "Technical Manager"}
                        onChange={() => handleRoleCheckboxChange("Technical Manager")} />
                    <label htmlFor="" className="text-gray-700">Technical Manager</label>
                    </div>
                    <div>
                    <input type="checkbox" id="" className="mr-2" name="role" checked={selectedRole === "Analyst"}
                        onChange={() => handleRoleCheckboxChange("Analyst")} />
                    <label htmlFor="" className="text-gray-700">Analyst</label>
                    </div>
                    {/* <div>
                    <input type="checkbox" id="" className="mr-2" name="role" checked={selectedRole === "Sample Registration"}
                        onChange={() => handleRoleCheckboxChange("Sample Registration")} />
                    <label htmlFor="" className="text-gray-700">Sample Registration</label>
                    </div> */}
                    <div>
                    <input type="checkbox" id="" className="mr-2" name="role" checked={selectedRole === "Sample Review"}
                        onChange={() => handleRoleCheckboxChange("Sample Review")} />
                    <label htmlFor="" className="text-gray-700">Sample Review</label>
                    </div>
                </div>
                </div>

                <div className="border border-blue-500 border-2 rounded-md p-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                <div className={groups.length>4?'max-h-32 overflow-y-auto':''}>
                    {
                        groups.map((item)=>{
                            return (
                                <div key={item._id}>
                                    <input type="checkbox" id=""  checked={selectedGroup === item.Group_Name} onChange={() => handleGroupCheckboxChange(item.Group_Name)} className="mr-2" />
                                    <label htmlFor="" className="text-gray-700">{item.Group_Name}</label>
                                </div>
                            )
                        })
                    }
                    
                </div>
                </div>

                <div className="border border-blue-500 border-2 rounded-md p-4 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reporting To:</label>
                <div className="">
                    <div>
                    <input type="checkbox" id="" className="mr-2" />
                    <label htmlFor="" className="text-gray-700">Technical Manager</label>
                    </div>
                </div>
                </div>

            </div>
            <div className=" w-full mt-2 ">
                <button
                    type="button"
                    // onClick={handleAddMore}
                    className="text-sm text-white bg-indigo-700 py-1 px-4 float-right rounded-md"
                >
                    Add More
                </button>
            </div>
            <div className="flex justify-center mt-6">
                <button type="button" className="bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800">
                Submit
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AddUser