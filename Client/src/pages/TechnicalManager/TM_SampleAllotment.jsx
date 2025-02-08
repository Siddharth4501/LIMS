import React, { useEffect, useState } from 'react';
import Samples from '../../components/Samples';
import { getSampleData } from '../../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCommonNav from '../../components/UserCommonNav';

const TM_SampleAllotment = () => {
  
  const dispatch=useDispatch();
  const { sampleData }=useSelector((state)=>state.sample)
  const navigate=useNavigate();
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
  const [found,setFound]=useState(false);
  useEffect(()=>{
    const filteredSample=samples?.filter((data)=>data.Sample_Status === 'Forwarded To TM' && data.Active===true && assignedGroups.includes(data.Group))
      if(filteredSample.length>0){
        setFound(true);
      }
  },[samples,userData,found])
  return (
    <div className="">
      <UserCommonNav assignedRole='Technical Manager'/>
      <div className='w-full flex p-5'>
          <div className='w-full'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Technical Manager/Home')}>Back</button></div>
      </div>
      {
        found?(
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
                  </tr>
                </thead>
              {
                samples?.filter((data)=>data.Sample_Status === 'Forwarded To TM' && data.Active===true && assignedGroups.includes(data.Group)).map((element,index)=>{
                  return <Samples key={element._id} difference='Sample Allotment Datails' data={element} index={index}/>
                })
              }
              </table>
          </div>
        ):(
          <div className='text-2xl font-semibold text-center w-full h-[48vh] translate-y-1/2 text-gray-800'>No Samples for Allotment!!!</div>
        )
      }

    </div>
  );
};

export default TM_SampleAllotment;
