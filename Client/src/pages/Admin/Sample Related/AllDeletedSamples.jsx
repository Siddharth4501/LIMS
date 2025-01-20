import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSampleData } from '../../../Redux/Slices/SampleSlice';
import Samples from '../../../components/Samples';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const AllDeletedSamples = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { sampleData }=useSelector((state)=>state.sample)
    const[samples,setSamples]=useState([]);
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    useEffect(() => {
        (async () => {
          await dispatch(getSampleData());
        })();
      }, []);
    useEffect(()=>{setSamples(sampleData)},[sampleData])
    useEffect(() => {
      const filtered = samples?.filter(item =>
        item.Name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }, [query]);
  return (
    <>
    <AdminCommomNav/>
      <div className='flex'>
        <AdminCommonPanel />
        <div className='w-full '>
      <br /><br />
      <div className='w-full bg-slate-200 border border-indigo-700 border-[2px] p-4'>
          <input type="text" className='w-1/2 border border-blue-800 border-2 rounded-md h-8 p-5 flex mx-auto' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular Sample...' />
      </div>
      <br /><br />
      {
        filteredItems.length===0?query===''?(
          <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-slate-200">
            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Reg. No.</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Registered Date</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
            {/* <th className="border border-gray-300 px-4 py-2 text-center">Delete</th> */}
          </tr>
        </thead>
        {
          samples?.filter((data)=>data.Active===false).map((element,index)=>{
            return <Samples key={`${'All Deleted Sample History'}-${element._id}`} difference='All Deleted Sample History' data={element} index={index}/>
          })
        }
        </table>
        ):(
          <div className='text-2xl font-bold w-full text-center'>No Results Found!!!</div>
        ):(
          <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-slate-200">
            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Reg. No.</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Registered Date</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
          </tr>
        </thead>
        {
          filteredItems?.filter((data)=>data.Active===false).map((element,index)=>{
            return <Samples key={`${'All Deleted Sample History'}-${element._id}`} difference='All Deleted Sample History' data={element} index={index}/>
          })
        }
        </table>
        )
      }
      

    </div>
    </div>
    </>
  )
}

export default AllDeletedSamples