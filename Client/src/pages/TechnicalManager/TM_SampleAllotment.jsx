import React, { useEffect, useState } from 'react';
import Samples from '../../components/Samples';
import { getSampleData } from '../../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';

const TM_SampleAllotment = () => {
  
  const dispatch=useDispatch();
  const { sampleData }=useSelector((state)=>state.sample)
  const userData=JSON.parse(localStorage.getItem("userData"));
  const [assignedGroups,setAssignedGroups]=useState([])
  console.log(userData,"yyy")
  const[samples,setSamples]=useState([]);
  
  useEffect(() => {
      (async () => {
        await dispatch(getSampleData());
      })();
    }, []);
  useEffect(()=>{setSamples(sampleData)},[sampleData])
  useEffect(()=>{
    const userGroup=[]
    userData?.roles.map((item)=>{
      if(item.designation==='Technical Manager'){
        console.log(item.Assigned_Group,"uit")
        item.Assigned_Group.map((data)=>{
          userGroup.push(data)
        })
        
      }
    })
    setAssignedGroups(userGroup);
  },[])
  console.log("lala",assignedGroups);
  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold mt-8 mb-6">Sample Allotment</h1>
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
          samples?.filter((data)=>data.Sample_Status === 'Forwarded To TM' && assignedGroups.includes(data.Group)).map((element,index)=>{
            return <Samples key={element._id} difference='Sample Allotment Datails' data={element} index={index}/>
          })
        }
        </table>

    </div>
  );
};

export default TM_SampleAllotment;
