import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { DeleteUserData, getAllUserData } from '../../../Redux/Slices/AuthSlice';
import { all } from 'axios';
import { BsTrash } from "react-icons/bs";
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';
import { getTMANData } from '../../../Redux/Slices/SampleSlice';

const UserList = () => {
  const { allUserData } = useSelector((state) => state.auth);
  const { TmAnData }=useSelector((state)=>state.sample)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allUserDataState, setAllUserDataState] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
      (async () => {
      await dispatch(getTMANData());
      })();
  }, []);

  // Pagination state
  const [totalPagesState,setTotalPagesState]=useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page
 
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [TmAnDataState,setTmAnDataState]=useState([]);
    useEffect(() => {
        setTmAnDataState(TmAnData);
      },[TmAnData])

  useEffect(() => {
    if(query.trim() !== ''){
      const filtered = allUserDataState?.filter(item =>
        item.Active_Status===true && (item.fullName.toLowerCase().includes(query.toLowerCase()) || item.email.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  }, [query,allUserDataState]);
  useEffect(() => {
    (async () => {
      await dispatch(getAllUserData());
    })();
  }, []);
  useEffect(() => {
    setAllUserDataState([...allUserData]?.sort((a, b) => a.fullName.localeCompare(b.fullName)));
  },[allUserData])

  const handleDelete = async (userID,name) => {
    try {
      const foundData=TmAnDataState?.filter((element)=>element.AN_Status.some((data)=>data.Analyst.ID===String(userID) && data.Status !=='Approved By TM'));
      if(foundData.length>0){
        toast.error(`Alloted Sample Results Are Still Pending At Analyst-${name},Can't be Deleted`)
        return;
      }
      const data = {
        "userID": userID
      }
      const response = await dispatch(DeleteUserData(data));
      if (response?.payload?.success) {
        toast.success('User Deleted Successfully');
        navigate('/Admin/User/UserList')
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const [currentDataState,setCurrentDataState]=useState()

  // Calculate current page data
  useEffect(()=>{
    if(filteredItems.length>0 && query !==''){
      const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
      setTotalPagesState(totalPages);
    }
    else{
      const totalPages = Math.ceil(allUserDataState?.filter((item)=>item.Active_Status===true)?.length / itemsPerPage);
      setTotalPagesState(totalPages);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if(filteredItems.length>0 && query !==''){
      const currentData = filteredItems?.slice(startIndex, endIndex);
      setCurrentDataState(currentData);
    }
    else{
      const currentData = allUserDataState?.filter((item)=>item.Active_Status===true)?.slice(startIndex, endIndex);
      setCurrentDataState(currentData);
    }
    
  },[filteredItems,allUserDataState,currentPage,itemsPerPage,totalPagesState]);
  return (
    <>
      <AdminCommomNav />
      <div className='flex'>
        <AdminCommonPanel />
        <div className='w-full'>
          <br /><br />
          <div className='flex w-full bg-gray-100 border-blue-600 border-2 p-3'>
            <div className='w-1/2'>
              <input type="text" className='w-3/4 border-blue-600 border-2 rounded-md h-8 p-4 ml-5 outline-0' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
            </div>
            <div className='w-1/2'>
              <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4' onClick={() => navigate('/Admin/User/AddUser')}>Add User</button>
            </div>
          </div>
          <br /><br />
          <span><b>Note1:</b>Search User on the basis of Name or Email</span>
          {
            allUserDataState?.filter((data) => data.Active_Status === true).length>0?(
              <div>
                {
                  filteredItems.length === 0 ? query === '' ? (
                    <div>
                      <table className='table-auto w-full border-collapse border border-gray-300'>
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">User Name.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">User ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Reset Password</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            currentDataState?.filter((data) => data.Active_Status === true).filter((element)=>element.roles.some((ele)=>ele.designation !=='Admin'))?.map((item, index) => {
                              const designation = [];
                              item.roles.map((role) => {
                                designation.push(role.designation)
                              })
                              return (
                                <tr className="hover:bg-gray-100" key={`all-${item._id}`} >
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index + 1}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.fullName}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{designation.toString()}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/reset-password', { state: { ...item } })}>Click</button></td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id,item.fullName)}><BsTrash /></button></td>
                                </tr>
                              )
                            })
                          }
      
                        </tbody>
                      </table>
                      {/* Pagination Controls */}
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="bg-indigo-700 text-white px-4 py-1 rounded-md mx-1 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span className="mx-2">
                          Page {currentPage} of {totalPagesState}
                        </span>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPagesState}
                          className="bg-indigo-700 text-white px-4 py-1 rounded-md mx-1 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
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
                            <th className="border border-gray-300 px-4 py-2 text-center">Reset Password</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            currentDataState?.filter((data) => data.Active_Status === true).filter((element)=>element.roles.some((ele)=>ele.designation !=='Admin'))?.map((item, index) => {
                              const designation = [];
                              item.roles.map((role) => {
                                designation.push(role.designation)
                              })
                              return (
                                <tr className="hover:bg-gray-100" key={`filtered-${item._id}`} >
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index + 1}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.fullName}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item._id}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{designation.toString()}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/UserList/View_More', { state: { ...item } })}>View</button></td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={() => navigate('/Admin/User/reset-password', { state: { ...item } })}>Click</button></td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id,item.fullName)}><BsTrash /></button></td>
                                </tr>
                              )
                            })
                          }
      
                        </tbody>
                      </table>
                      {/* Pagination Controls */}
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="bg-indigo-700 text-white px-4 py-1 rounded-md mx-1 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span className="mx-2">
                          Page {currentPage} of {totalPagesState}
                        </span>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPagesState}
                          className="bg-indigo-700 text-white px-4 py-1 rounded-md mx-1 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
              )
              :
              (
                <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No User Registrations Yet!!!</div></div>
              )
            }

        </div>
      </div>
    </>
  )
}

export default UserList

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { DeleteUserData, getAllUserData } from '../../../Redux/Slices/AuthSlice';
// import { BsTrash } from 'react-icons/bs';
// import toast from 'react-hot-toast';
// import AdminCommomNav from '../../../components/AdminCommomNav';
// import AdminCommonPanel from '../../../components/AdminCommonPanel';

// const UserList = () => {
//   const { allUserData } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [allUserDataState, setAllUserDataState] = useState([]);
//   const [query, setQuery] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3); // Number of items per page
//   const [currentPageState, setCurrentPageState] = useState(1);
//   // Calculate total pages
//   const totalPages = Math.ceil(allUserDataState?.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (page) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentData = allUserDataState?.slice(startIndex, endIndex);
//     setCurrentPage(page);
//     setCurrentPageState(currentData);
//   };

//   // Filter data based on query
//   useEffect(() => {
//     const filtered = allUserDataState?.filter(
//       (item) =>
//         item.fullName.toLowerCase().includes(query.toLowerCase()) ||
//         item.email.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredItems(filtered);
//     setCurrentPage(1); // Reset to the first page when filtering
//   }, [query, allUserDataState]);

//   // Fetch all user data
//   useEffect(() => {
//     (async () => {
//       await dispatch(getAllUserData());
//     })();
//   }, [dispatch]);

//   // Update local state with Redux data
//   useEffect(() => {
//     setAllUserDataState(allUserData);
//   }, [allUserData]);

//   // Handle delete user
//   const handleDelete = async (userID) => {
//     try {
//       const data = { userID };
//       const response = await dispatch(DeleteUserData(data));
//       if (response?.payload?.success) {
//         toast.success('User Deleted Successfully');
//         navigate('/Admin/Home');
//       }
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   // Calculate current page data
  

//   return (
//     <>
//       <AdminCommomNav />
//       <div className="flex">
//         <AdminCommonPanel />
//         <div className="w-full">
//           <br />
//           <br />
//           <div className="flex w-full bg-slate-200 border-indigo-700 border-[2px] p-3">
//             <div className="w-1/2">
//               <input
//                 type="text"
//                 className="w-3/4 border-blue-800 border-2 rounded-md h-8 p-4 ml-5"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search For A Particular User..."
//               />
//             </div>
//             <div className="w-1/2">
//               <button
//                 className="bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4"
//                 onClick={() => navigate('/Admin/User/AddUser')}
//               >
//                 Add User
//               </button>
//             </div>
//           </div>
//           {allUserDataState?.filter((data) => data.Active_Status === true).length > 0 ? (
//             <div>
//               {filteredItems.length === 0 && query !== '' ? (
//                 <div className="text-2xl font-bold w-full text-center">No Results Found!!!</div>
//               ) : (
//                 <div>
//                   <table className="table-auto w-full border-collapse border border-gray-300">
//                     <thead>
//                       <tr className="bg-slate-200">
//                         <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
//                         <th className="border border-gray-300 px-4 py-2 text-center">User Name.</th>
//                         <th className="border border-gray-300 px-4 py-2 text-center">User ID</th>
//                         <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
//                         <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
//                         <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentPageState
//                         ?.filter((data) => data.Active_Status === true)
//                         .filter((element) => element.roles.some((ele) => ele.designation !== 'Admin'))
//                         .map((item, index) => {
//                           const designation = item.roles.map((role) => role.designation);
//                           return (
//                             <tr className="hover:bg-gray-100" key={item._id}>
//                               <td className="border border-gray-300 px-4 py-2 text-center max-w-72 overflow-x-auto">
//                                 {startIndex + index + 1}
//                               </td>
//                               <td className="border border-gray-300 px-4 py-2 text-center max-w-72 overflow-x-auto">
//                                 {item.fullName}
//                               </td>
//                               <td className="border border-gray-300 px-4 py-2 text-center max-w-72 overflow-x-auto">
//                                 {item._id}
//                               </td>
//                               <td className="border border-gray-300 px-4 py-2 text-center max-w-72 overflow-x-auto">
//                                 {designation.toString()}
//                               </td>
//                               <td className="border border-gray-300 px-4 py-2 text-center max-w-72 overflow-x-auto">
//                                 <button
//                                   type="button"
//                                   className="bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800"
//                                   onClick={() =>
//                                     navigate('/Admin/User/UserList/View_More', { state: { ...item } })
//                                   }
//                                 >
//                                   View
//                                 </button>
//                               </td>
//                               <td className="border border-gray-300 px-4 py-2 text-center max-w-72 overflow-x-auto">
//                                 <button
//                                   type="button"
//                                   className="bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800"
//                                   onClick={() => handleDelete(item._id)}
//                                 >
//                                   <BsTrash />
//                                 </button>
//                               </td>
//                             </tr>
//                           );
//                         })}
//                     </tbody>
//                   </table>

//                   {/* Pagination Controls */}
//                   <div className="flex justify-center mt-4">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="bg-indigo-700 text-white px-4 py-1 rounded-md mx-1 disabled:opacity-50"
//                     >
//                       Previous
//                     </button>
//                     <span className="mx-2">
//                       Page {currentPage} of {totalPages}
//                     </span>
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="bg-indigo-700 text-white px-4 py-1 rounded-md mx-1 disabled:opacity-50"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="h-[68vh] w-[96vw] flex justify-center items-center">
//               <div className="text-2xl font-semibold">No User Registrations Yet!!!</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserList;