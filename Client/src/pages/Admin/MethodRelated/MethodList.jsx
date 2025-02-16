import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import toast from 'react-hot-toast';
import { deleteSubstance, getSubstanceData } from '../../../Redux/Slices/SubstanceSlice';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const MethodList = () => {
  const { substanceData } = useSelector((state) => state.substance);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allSubstanceDataState, setAllSubstanceDataState] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [flattenedMethodsList, setFlattenedMethodsList] = useState([]);
  
  // Pagination state
  const [totalPagesState,setTotalPagesState]=useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Handle page change
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };
  useEffect(() => {
    if(query.trim() ===''){
      setFilteredItems(flattenedMethodsList);
    }
    else{
      const filtered = flattenedMethodsList?.filter(item =>
        item.testName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  }, [query,flattenedMethodsList]);
  useEffect(() => {
    (async () => {
      await dispatch(getSubstanceData());
    })();
  }, []);
  useEffect(() => {
    setAllSubstanceDataState([...substanceData].sort((a, b) => a.Test.Test_Name.localeCompare(b.Test.Test_Name)));
  }, [substanceData]);

  // Flatten all tests from groups
  useEffect(() => {
      const allMethodsList = allSubstanceDataState?.flatMap(substance => 
          substance?.MethodUnitList?.map(data => ({
              methodID:substance._id,
              methodList:data,
              testName: substance.Test.Test_Name,
              testID: substance.Test.TestID
          }))
      );
      setFlattenedMethodsList(allMethodsList);
  }, [allSubstanceDataState]);

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
  
  },[filteredItems,allSubstanceDataState,itemsPerPage,currentPage,totalPagesState]);

  const handleDelete = async (methodID,Method,Unit,Limit) => {
    try {
      const data = {
        "methodID": methodID,
        "Method":Method,
        "Unit":Unit,
        "Limit":Limit
      }
      const response = await dispatch(deleteSubstance(data));
      if (response?.payload?.success) {
        toast.success('Method Deleted Successfully');
        navigate('/Admin/Substance/MethodList')
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
              <input type="text" className='w-3/4 border-blue-600 border-2 rounded-md h-8 p-4 ml-5' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
            </div>
            <div className='w-1/2'>
              <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4' onClick={() => navigate('/Admin/Substance/AddMethod')}>Add Method</button>
            </div>
          </div>
          {
            allSubstanceDataState.length>0?
            (
              <div>

                  <br /><br />
                  <span><b>Note1:</b>Search Methods on the basis of Test</span>
                  {
                    filteredItems.length == 0 ? query === '' ? (
                      <div>
                        <table className='table-auto w-full border-collapse border border-gray-300'>
                          <thead>
                            <tr className="bg-slate-200">
                              <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Test</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Test ID</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Method</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Unit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Limit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              currentDataState?.map((item, index) => {
                                const currentIndex = indexsCounter++;
                                return (
      
                                  <tr className="hover:bg-gray-100" key={`${item.methodID}-${item.methodList.Method}-${currentIndex}`} >
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.testName}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.testID}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.methodList.Method}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.methodList.Unit}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.methodList.Limit ? item.methodList.Limit:''}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item.methodID,item.methodList.Method,item.methodList.Unit,item.methodList.Limit)}><BsTrash /></button></td>
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
                              <th className="border border-gray-300 px-4 py-2 text-center">Test</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Test ID</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Method</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Unit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Limit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              currentDataState?.map((item, index) => {
                                const currentIndex = indexsCounter++;
                                return (
                                  <tr className="hover:bg-gray-100" key={`Search-Related-${item.methodID}-${item.methodList.Method}-${currentIndex}`} >
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.testName}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.testID}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.methodList.Method}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.methodList.Unit}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.methodList.Limit ? item.methodList.Limit:''}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item.methodID,item.methodList.Method,item.methodList.Unit,item.methodList.Limit)}><BsTrash /></button></td>
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
              <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No Method Added Yet!!!</div></div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default MethodList