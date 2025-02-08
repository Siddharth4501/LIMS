import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTest, getGroupData } from '../../../Redux/Slices/GroupSilce';
import { BsTrash } from "react-icons/bs";
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const TestsList = () => {
    const { groupData } = useSelector((state) => state.group);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allGroupDataState, setAllGroupDataState] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    useEffect(() => {
        const filtered = allGroupDataState?.filter(item =>
            item.Tests.some(data => data.Test.toLowerCase().includes(query.toLowerCase()))//return boolean value
        );
        //filtered item gives all groups satisfying the condition
        setFilteredItems(filtered);
    }, [query,allGroupDataState]);
    useEffect(() => {
        (async () => {
            await dispatch(getGroupData());
        })();
    }, []);
    useEffect(() => {
        setAllGroupDataState(groupData);
    }, [groupData])

    const handleDelete = async (groupID,Test) => {
        try {
          console.log(groupID,Test, "judju")
          const data = {
            "groupID": groupID,
            "Test":Test
          }
          const response = await dispatch(deleteTest(data));
          if (response?.payload?.success) {
            toast.success('Test Deleted Successfully');
            navigate('/Admin/Group/TestsList')
          }
        } catch (error) {
          toast.error(error)
        }
      }
    let indexsCounter = 1;
    return (
        <>
            <AdminCommomNav />
            <div className='flex'>
                <AdminCommonPanel />
                <div className='w-full'>
                    
                    <br /><br />
                    <div className='flex w-full bg-gray-100 border-2 border-blue-600 p-3'>
                        <div className='w-1/2'>
                            <input type="text" className='w-3/4 border-2 border-blue-600 rounded-md h-8 p-4 ml-5' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
                        </div>
                        <div className='w-1/2'>
                            <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4' onClick={() => navigate('/Admin/Group/AddTests')}>Add Tests</button>
                        </div>
                    </div>
                    {
                        allGroupDataState.length>0?
                        (
                            <div>
                                <br /><br />
                                {
                                    filteredItems.length === 0 ? query === '' ? (
                                        <div>
                                            <table className='table-auto w-full border-collapse border border-gray-300'>
                                                <thead>
                                                    <tr className="bg-slate-200">
                                                        <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Test</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Type Of Testing</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Group ID</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                                                        {/* <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Expand</th> */}
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        allGroupDataState?.map((item, index) => {
                                                            return (
                                                                item.Tests?.map((data, i) => {
                                                                    const currentIndex = indexsCounter++;
                                                                    return (
                                                                        <tr className="hover:bg-gray-100" key={`${data.Test}-${i}`} >
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Test}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Type_Of_Testing}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Group_Name}</td>
                                                                            {/* <td className="border border-gray-300 px-4 py-2 text-center">{designation.toString()}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td> */}
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id,data.Test)}><BsTrash /></button></td>
                                                                        </tr>
                                                                    )
                                                                }))
                                                        })
                                                    }
            
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className='text-2xl font-bold w-full text-center'>No Results Found!!!</div>
                                    ) : (
                                        <div>
                                            <table className='table-auto w-full border-collapse border border-gray-300'>
                                                <thead>
                                                    <tr className="bg-slate-200">
                                                        <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Test</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Type Of Testing</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Group ID</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                                                        {/* <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Expand</th> */}
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filteredItems.map((item, index) => {
                                                            return (
                                                                item.Tests.filter((data) =>
                                                                    data.Test.toLowerCase().includes(query.toLowerCase())
                                                                ).map((testObj, i) => {
                                                                    const currentIndex = indexsCounter++;
                                                                    return (
                                                                        <tr className="hover:bg-gray-100" key={`${testObj.Test}-${i}`} >
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{testObj.Test}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{testObj.Type_Of_Testing}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Group_Name}</td>
                                                                            {/* <td className="border border-gray-300 px-4 py-2 text-center">{designation.toString()}</td> */}
                                                                            {/* <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td> */}
                                                                            <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id,testObj.Test)}><BsTrash /></button></td>
                                                                        </tr>
                                                                    )
                                                                }))
                                                        })
                                                    }
            
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }
                            </div>
                        )
                        :
                        (
                            <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No Test Added Yet!!!</div></div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default TestsList