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
  useEffect(() => {
    (async () => {
      await dispatch(getSampleData());
    })();
  }, []);
  useEffect(() => { setSamples(sampleData) }, [sampleData])
  useEffect(() => {
    const filtered = samples?.filter(item =>
      item.Active===true && (item.Name.toLowerCase().includes(query.toLowerCase()) || item.Group.toLowerCase().includes(query.toLowerCase()) || item.Date.toLowerCase().includes(query.toLowerCase()) || item.Type_Of_Testing.some((TOT)=>TOT.toLowerCase().includes(query.toLowerCase())))
    );
    setFilteredItems(filtered);
  }, [query,samples]);
  return (
    <>
      <AdminCommomNav />
      <div className='flex'>
        <AdminCommonPanel />
        {
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
                      samples?.filter((data) => data.Active === true)?.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())?.map((element, index) => {
                        return <Samples key={`${'All Sample History'}-${element._id}`} difference='All Sample History' data={element} index={index} />
                      })
                    }
                  </table>
                ) : (
                  <div className='text-2xl font-bold w-full text-center'>No Results Found!!!</div>
                ) : (
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
                      filteredItems?.filter((data) => data.Active === true)?.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())?.map((element, index) => {
                        return <Samples key={`${'All Sample History'}-${element._id}`} difference='All Sample History' data={element} index={index} />
                      })
                    }
                  </table>
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