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
    const [flattenedTests, setFlattenedTests] = useState([]);

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
            setFilteredItems(flattenedTests);
        } else {
            const filtered = flattenedTests.filter(test => 
                test.Test.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredItems(filtered);
        }
        setCurrentPage(1);
    }, [query, flattenedTests]);

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
        const allTests = allGroupDataState.flatMap(group => 
            group.Tests.map(test => ({
                ...test,
                groupID: group._id,
                groupName: group.Group_Name
            }))
        );
        setFlattenedTests(allTests);
    }, [allGroupDataState]);
    const [currentDataState,setCurrentDataState]=useState();

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

    const handleDelete = async (groupID,Test) => {
        try {
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
                                <span><b>Note1:</b>Search on the basis of Test</span>
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
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentDataState?.map((data, index) => {  
                                                            const currentIndex = indexsCounter++;
                                                            return (
                                                                <tr className="hover:bg-gray-100" key={`${data.Test}-${data.groupID}-${index}`} >
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Test}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Type_Of_Testing}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.groupID}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.groupName}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(data.groupID,data.Test)}><BsTrash /></button></td>
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
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Type Of Testing</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Group ID</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentDataState?.map((testObj, index) => {
                                                            
                                                            const currentIndex = indexsCounter++;
                                                            return (
                                                                <tr className="hover:bg-gray-100" key={`${testObj.Test}-${testObj.groupID}-${index}`} >
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{testObj.Test}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{testObj.Type_Of_Testing}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{testObj.groupID}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{testObj.groupName}</td>
                                                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(testObj.groupID,testObj.Test)}><BsTrash /></button></td>
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
                            <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No Test Added Yet!!!</div></div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default TestsList