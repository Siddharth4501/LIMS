import React, { useState, useEffect } from 'react'
import Samples from '../../../components/Samples';
import { getSampleData } from '../../../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const AllSamplesHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sampleData } = useSelector((state) => state.sample)
  const [samples, setSamples] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]); 
  const [loading, setLoading] = useState(true); // Added state for loading while fectching data from api
 
  useEffect(() => {
    (async () => {
      setLoading(true); // Sets loading to true before fetching data
      await dispatch(getSampleData());
      setLoading(false); // Sets loading to false after data is fetched
    })();
  }, [dispatch]);

  // Pagination state
  const [totalPagesState,setTotalPagesState]=useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25); // Number of items per page
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => { setSamples([...sampleData]?.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())) }, [sampleData])

  useEffect(() => {
    if(query.trim() !==''){
      const filtered = samples?.filter(item =>
        item.Active===true && (item.Name.toLowerCase().includes(query.toLowerCase()) || item.Group.toLowerCase().includes(query.toLowerCase()) || item.Date.toLowerCase().includes(query.toLowerCase()) || item.Type_Of_Testing.some((TOT)=>TOT.toLowerCase().includes(query.toLowerCase())))
      );
      setFilteredItems(filtered);
    }
    setCurrentPage(1);
  }, [query,samples]);

  const [currentDataState,setCurrentDataState]=useState()

  // Calculate current page data
  useEffect(()=>{
    if(filteredItems.length>0 && query !==''){
      const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
      setTotalPagesState(totalPages);
    }
    else{
      const totalPages = Math.ceil(samples?.filter((data)=>data.Active === true)?.length / itemsPerPage);
      setTotalPagesState(totalPages);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if(filteredItems.length>0 && query !==''){
      const currentData = filteredItems?.slice(startIndex, endIndex);
      setCurrentDataState(currentData);
    }
    else{
      const currentData = samples?.filter((data)=>data.Active === true)?.slice(startIndex, endIndex);
      setCurrentDataState(currentData);
    }
    
  },[filteredItems,samples,itemsPerPage,currentPage,totalPagesState]);
  return (
    <>
      <AdminCommomNav />
      <div className='flex'>
        <AdminCommonPanel />
        {
          loading ? (
            <div className='h-[84vh] w-screen flex justify-center items-center'>
              <img src="/src/assets/images/1486.gif" alt="Loading....." />
            </div>
          )
          :
          samples?.filter((data) => data.Active === true).length>0?(

            <div className='w-full'>
              <br /><br />
              <div className='w-full bg-gray-100 border border-indigo-700 border-[2px] p-4'>
                <input type="text" className='w-1/2 border border-blue-800 border-2 rounded-md h-8 p-4 flex mx-auto outline-0' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular Sample...' />
              </div>
              <br /><br />
              <span><b>Note1:</b>Samples whoes status is other than 'Forwared To TM' cannot be deleted</span> <br />
              <span><b>Note2:</b>Search Samples on the basis of Sample Name,Group,Registration Date and Type Of Testing</span>
              {
                filteredItems.length === 0 ? query === '' ? (
                  <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-slate-200">
                          <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Reg. No.</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Registration Date</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Report</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                        </tr>
                      </thead>
                      {
                        currentDataState?.filter((data) => data.Active === true)?.map((element, index) => {
                          return <Samples key={`${'All Sample History'}-${element._id}`} difference='All Sample History' data={element} index={index} />
                        })
                      }
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

                      <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Reg. No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Registration Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Report</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        {
                          currentDataState?.filter((data) => data.Active === true)?.map((element, index) => {
                            return <Samples key={`${'All Sample History'}-${element._id}`} difference='All Sample History' data={element} index={index} />
                          })
                        }
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
          ):
          (
            <div className='h-[84vh] w-screen flex justify-center items-center '><div className='text-2xl font-semibold'>No Samples Registered Yet!!!</div></div>
          )
        }
      </div>
    </>
  )
}

export default AllSamplesHistory