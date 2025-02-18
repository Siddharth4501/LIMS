import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteGroupData, getGroupData } from '../../../Redux/Slices/GroupSilce';
import { BsTrash } from "react-icons/bs";
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';


const GroupList = () => {
  const { groupData } = useSelector((state) => state.group);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allGroupDataState, setAllGroupDataState] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const filtered = allGroupDataState?.filter(item =>
      item.Group_Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query,allGroupDataState]);

  useEffect(() => {
    (async () => {
      await dispatch(getGroupData());
    })();
  }, []);
  
  useEffect(() => {
    setAllGroupDataState([...groupData].sort((a, b) => a.Group_Name.localeCompare(b.Group_Name)));
  }, [groupData]);

  const handleDelete = async (groupID) => {
    try {
      const data = {
        "groupID": groupID
      }
      const response = await dispatch(deleteGroupData(data));
      if (response?.payload?.success) {
        toast.success('Group Deleted Successfully');
        navigate('/Admin/Group/GroupList')
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
    <AdminCommomNav/>
      <div className='flex'>
        <AdminCommonPanel />
        <div className='w-full '>
          <br /><br />
          <div className='flex w-full bg-gray-100 border-blue-600 border-2 p-3'>
            <div className='w-1/2'>
              <input type="text" className='w-3/4  border-blue-600 border-2 rounded-md h-8 p-4 ml-5' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
            </div>
            <div className='w-1/2'>
              <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4' onClick={() => navigate('/Admin/Group/AddGroup')}>Add Group</button>
            </div>
          </div>
          {
            allGroupDataState.length>0?(
              <div>

                  <br /><br />
                  <span><b>Note1:</b>Search on the basis of Group Name</span>
                  {
                    filteredItems.length === 0 ? query === '' ? (
                      <div>
                        <table className='table-auto w-full border-collapse border border-gray-300'>
                          <thead>
                            <tr className="bg-slate-200">
                              <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Group Name</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Group ID</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Group Location No.</th>
                              {/* <th className="border border-gray-300 px-4 py-2 text-center">Expand</th> */}
                              <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              allGroupDataState?.map((item, index) => {
                                return (
                                  <tr className="hover:bg-gray-100" key={item._id} >
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center  max-w-72  overflow-x-auto">{item.Group_Name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Group_Location_Number}</td>
                                    {/* <td className="border border-gray-300 px-4 py-2 text-center">{designation.toString()}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td> */}
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id)}><BsTrash /></button></td>
                                  </tr>
                                )
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
                              <th className="border border-gray-300 px-4 py-2 text-center">Group Name</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Group ID</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Group Location No.</th>
                              {/* <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Expand</th> */}
                              <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              filteredItems?.map((item, index) => {
                                return (
                                  <tr className="hover:bg-gray-100" key={item._id} >
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Group_Name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Group_Location_Number}</td>
                                    {/* <td className="border border-gray-300 px-4 py-2 text-center">{designation.toString()}</td> */}
                                    {/* <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td> */}
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id)}><BsTrash /></button></td>
                                  </tr>
                                )
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
              <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No Group Added Yet!!!</div></div>
            )
          }

        </div>
      </div>
    </>
  )
}

export default GroupList