import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTypeOfTesting, getGroupData } from '../../../Redux/Slices/GroupSilce';
import { BsTrash } from "react-icons/bs";
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const TypeOfTestingList = () => {
  const { groupData } = useSelector((state) => state.group);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allGroupDataState, setAllGroupDataState] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [flattenedTypeOfTestings, setFlattenedTypeOfTestings] = useState([]);

  // Pagination state
  const [totalPagesState,setTotalPagesState]=useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Handle page change
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };
  
  // Filter tests based on search query
  useEffect(() => {
      if (query.trim() === '') {
          setFilteredItems(flattenedTypeOfTestings);
      } else {
          const filtered = flattenedTypeOfTestings.filter(tot => 
              tot.typeOfTest.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredItems(filtered);
      }
      setCurrentPage(1);
  }, [query, flattenedTypeOfTestings]);

  useEffect(() => {
    (async () => {
      await dispatch(getGroupData());
    })();
  }, []);
  useEffect(() => {
    setAllGroupDataState([...groupData].sort((a, b) => a.Group_Name.localeCompare(b.Group_Name)));
  }, [groupData]);

  // Flatten all tests from groups
  useEffect(() => {
      const allTypeOfTesting = allGroupDataState?.flatMap(group => 
          group.Type_Of_Testing.map(data => ({
              typeOfTest:data,
              groupID: group._id,
              groupName: group.Group_Name
          }))
      );
      setFlattenedTypeOfTestings(allTypeOfTesting);
  }, [allGroupDataState]);

  const [currentDataState,setCurrentDataState]=useState()
  // Calculate current page data
  useEffect(()=>{
  if(filteredItems.length>0 && query !==''){
      const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
      setTotalPagesState(totalPages);
  }
  else{
      const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
      setTotalPagesState(totalPages);
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  if(filteredItems.length>0 && query !==''){
      const currentData = filteredItems?.slice(startIndex, endIndex);
      setCurrentDataState(currentData);
  }
  else{
      const currentData = filteredItems?.slice(startIndex, endIndex);
      setCurrentDataState(currentData);
  }
  
  },[filteredItems,allGroupDataState,itemsPerPage,currentPage,totalPagesState]);

  const handleDelete = async (groupID,TypeOfTesting) => {
    try {
      const data = {
        "groupID": groupID,
        "Type_Of_Testing":TypeOfTesting
      }
      const response = await dispatch(deleteTypeOfTesting(data));
      if (response?.payload?.success) {
        toast.success('Type Of Testing Deleted Successfully');
        navigate('/Admin/Group/TypeOfTestingList')
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
          <div className='flex w-full bg-gray-100 border-blue-600 border-2 p-3'>
            <div className='w-1/2'>
              <input type="text" className='w-3/4 border-blue-600 border-2 rounded-md h-8 p-4 ml-5 outline-0' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
            </div>
            <div className='w-1/2'>
              <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4' onClick={() => navigate('/Admin/Group/AddTypeOfTesting')}>Add Type Of Testing</button>
            </div>
          </div>
          {
            allGroupDataState.length>0?
            (
              <div>
                <br /><br />
                <span><b>Note1:</b>Search on the basis of Type Of Testing</span>
                {
                  filteredItems.length === 0 ? query === '' ? (
                    <div>
                      <table className='table-auto w-full border-collapse border border-gray-300'>
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Type Of Testing</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
      
                            currentDataState?.map((data, index) => {
                              const currentIndex = indexsCounter++;
                              return (
                                <tr className="hover:bg-gray-100" key={`${data.typeOfTest}-${data.groupID}-${index}`} >
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.typeOfTest}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.groupID}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.groupName}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(data.groupID,data.typeOfTest)}><BsTrash /></button></td>
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
                            <th className="border border-gray-300 px-4 py-2 text-center">Type Of Testing</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            currentDataState?.map((TOT, index) => {
                              const currentIndex = indexsCounter++;
                              return (
                                <tr className="hover:bg-gray-100" key={`${TOT.typeOfTest}-${TOT.groupID}-${index}`} >
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{TOT.typeOfTest}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{TOT.groupID}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{TOT.groupName}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(TOT.groupID,TOT.typeOfTest)}><BsTrash /></button></td>
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
              <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No Type Of Testing Added Yet!!!</div></div>
            )
          }

        </div>
      </div>
    </>
  )
}

export default TypeOfTestingList