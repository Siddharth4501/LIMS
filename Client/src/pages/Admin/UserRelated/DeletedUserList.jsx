import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllUserData } from '../../../Redux/Slices/AuthSlice';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const DeletedUserList = () => {
  const { allUserData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allUserDataState, setAllUserDataState] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const filtered = allUserData.filter(item =>
      item.fullName.toLowerCase().includes(query.toLowerCase()) || item.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);
  useEffect(() => {
    (async () => {
      await dispatch(getAllUserData());
    })();
  }, []);
  useEffect(() => {
    setAllUserDataState(allUserData);
  }, [allUserData])
  return (
    <>
      <AdminCommomNav />
      <div className='flex'>
        <AdminCommonPanel />
        {
          allUserDataState?.filter((data) => data.Active_Status === false).length>0?(

            <div className='w-full'>
              <br /><br /> 
              <div className='flex w-full bg-slate-200 border-indigo-700 border-[2px] p-3'>
                <div className='w-1/2'>
                  <input type="text" className='w-3/4 border-blue-800 border-2 rounded-md h-8 p-4 ml-5' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
                </div>
              </div>
              <br /><br />
              {
                filteredItems.length == 0 ? query === '' ? (
                  <div>
                    <table className='table-auto w-full border-collapse border border-gray-300'>
                      <thead>
                        <tr className="bg-slate-200">
                          <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">User Name.</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">User ID</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          allUserDataState?.filter((data) => data.Active_Status === false).map((item, index) => {
                            const designation = [];
                            item.roles.map((role) => {
                              designation.push(role.designation)
                            })
                            return (
                              <tr className="hover:bg-gray-100" key={item._id} >
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.fullName}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{designation.toString()}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td>
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
                          <th className="border border-gray-300 px-4 py-2 text-center">User Name.</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">User ID</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          filteredItems?.filter((data) => data.Active_Status === false).map((item, index) => {
                            const designation = [];
                            item.roles.map((role) => {
                              designation.push(role.designation)
                            })
                            return (
                              <tr className="hover:bg-gray-100" key={item._id} >
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.fullName}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{designation.toString()}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td>
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
          ):
          (
            <div className='h-[84vh] w-screen flex justify-center items-center '><div className='text-2xl font-semibold'>No Deleted Users Yet!!!</div></div>
          )
        }
      </div>
    </>
  )
}

export default DeletedUserList