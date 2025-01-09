import React,{useState,useEffect} from 'react'
import Samples from '../../components/Samples';
import { getSampleData } from '../../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';

const ParticularUserSRH = () => {
    const dispatch=useDispatch();
    const { sampleData }=useSelector((state)=>state.sample)
    const userData=JSON.parse(localStorage.getItem("userData"));
    const[samples,setSamples]=useState([]);
    useEffect(() => {
        (async () => {
        await dispatch(getSampleData());
        })();
    }, []);
    useEffect(()=>{setSamples(sampleData)},[sampleData])
  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold mt-8 mb-6">Sample Registration Record</h1>
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
            </tr>
          </thead>
        {
          samples?.filter((item)=>item.Registered_By===userData._id).map((element,index)=>{
            return <Samples key={element._id} difference='ParticularUser Sample History' data={element} index={index}/>
          })
        }
        </table>

    </div>
  )
}

export default ParticularUserSRH