import React,{useState,useEffect} from 'react'
import Samples from '../../components/Samples';
import { getSampleData } from '../../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCommonNav from '../../components/UserCommonNav';

const ParticularUserSRH = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const { sampleData }=useSelector((state)=>state.sample)
    const userData=JSON.parse(localStorage.getItem("userData"));
    const[samples,setSamples]=useState([]);
    useEffect(() => {
      (async () => {
        await dispatch(getSampleData());
      })();
    }, []);
    useEffect(()=>{setSamples(sampleData)},[sampleData])
    useEffect(() => {
      const filtered = samples?.filter((item)=>item.Registered_By===userData._id).filter(item =>
        item.Name.toLowerCase().includes(query.toLowerCase()) || item.Group.toLowerCase().includes(query.toLowerCase()) || item.Date.toLowerCase().includes(query.toLowerCase()) || item.Type_Of_Testing.some((TOT)=>TOT.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredItems(filtered);
    }, [query]);
  return (
    <div className="">
      <UserCommonNav assignedRole='Sample Registration'/>
      <div className='w-full p-5'>
        <div className='w-full'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Sample Registration/Home')}>Back</button></div>
      </div>
      <br /><br />
      <div className='w-full bg-gray-100 border-2 border-blue-600 border-[2px] p-4'>
          <input type="text" className='w-1/2 border-2 border-blue-600 border-2 rounded-md h-8 p-5 flex mx-auto outline-0' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
      </div>
      <br /><br />
      <span><b>Note1:</b>Search Samples on the basis of Sample Name,Group,Registration Date and Type Of Testing</span>
      {
        filteredItems.length==0?query===''?(
          <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
                <tr className="bg-slate-200">
                  <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Reg. No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Registered Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Expand
                      {/* <button className="text-blue-500 hover:text-blue-700 underline">Expand &gt;&gt; </button> */}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Sample Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Report</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Active/Deleted</th>
                </tr>
              </thead>
            {
              samples?.filter((item)=>item.Registered_By===userData._id).map((element,index)=>{
                return <Samples key={`${'ParticularUser Sample History'}-${element._id}`} difference='ParticularUser Sample History' data={element} index={index}/>
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
                  <th className="border border-gray-300 px-4 py-2 text-center">Expand
                      {/* <button className="text-blue-500 hover:text-blue-700 underline">Expand &gt;&gt; </button> */}
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Sample Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Report</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Active/Deleted</th>
                </tr>
              </thead>
            {
              filteredItems?.filter((item)=>item.Registered_By===userData._id).map((element,index)=>{
                return <Samples key={`${'ParticularUser Sample History'}-${element._id}`} difference='ParticularUser Sample History' data={element} index={index}/>
              })
            }
            </table>
        )
      }
      

    </div>
  )
}

export default ParticularUserSRH