import React, { useState,useEffect } from 'react'
import Samples from '../../../components/Samples';
import { getSampleData } from '../../../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';

const AllSamplesHistory = () => {
  const dispatch=useDispatch();
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
    <div className="">
      <div className='w-full flex border bg-gray-300 p-5'>
        <div className='w-3/5 text-3xl font-bold'><span className='float-right'>All Sample Registration Record</span></div>
        <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Home')}>Back</button></div>
      </div>
      <br /><br />
      <div className='w-full bg-slate-200 p-4'>
          <input type="text" className='w-1/2 border border-blue-800 border-2 rounded h-8 pl-2 flex mx-auto' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
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
            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>
        {
          samples?.map((element,index)=>{
            return <Samples key={element._id} difference='All Sample History' data={element} index={index}/>
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
            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>
        {
          filteredItems?.map((element,index)=>{
            return <Samples key={element._id} difference='All Sample History' data={element} index={index}/>
          })
        }
        </table>
        )
      }
      

    </div>
  )
}

export default AllSamplesHistory