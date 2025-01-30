import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  BsTrash } from "react-icons/bs";
import { DeleteSampleData } from '../Redux/Slices/SampleSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { FaPrint } from "react-icons/fa6";
import { MdPrintDisabled } from "react-icons/md";

const Samples = ({difference,data,index}) => {
  const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleRedirection=()=>{
        if(difference==='All Sample History'){
          navigate('/Admin/Sample/AllSampleHistory/View_More',{state:{...data,difference}})
        }
        else if(difference==='ParticularUser Sample History'){
          navigate('/SampleRegistrationUser/SampleHistory/View_More',{state:{...data,difference}})
        }
        else if(difference==='All Deleted Sample History'){
          navigate('/Admin/Sample/DeletedSampleHistory/View_More',{state:{...data,difference}})
        }
        else{
          navigate('/SampleAllotment/View_More',{state:{...data}})
        }
        
      }
    const handleDelete=async(sampleID)=>{
      try {
        console.log(sampleID,"judju")
        const data={
          "sampleID":sampleID
        }
        const response = await dispatch(DeleteSampleData(data));
        if (response?.payload?.success) {
          toast.success('Sample Deleted Successfully');
          navigate('/Admin/Home')
        }
      } catch (error) {
          toast.error(error)
      }
    }
    const handleReportView=()=>{
        navigate('/UserTestReport',{state:{...data,difference:'Normal Report'}})
    }
    const handleNABLView=()=>{
      navigate('/UserNABLTestReport',{state:{...data}})
    }
  return (
          
          <tbody>
              <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Registration_Number}</td>
              <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Group}</td>
              <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Date.split('T')[0]}</td>
              <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">                 
                <button className="bg-indigo-700 hover:bg-indigo-900 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={handleRedirection}>View </button>
              </td>
              {
                difference==='All Sample History' ?(
                  <>
                    <td className='border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto'>
                      {data.Sample_Status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">                 
                    {data?.Sample_Status==='Forwarded To TM'?<button className="bg-red-700 hover:bg-red-800 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={()=>handleDelete(data._id)}><BsTrash/></button>:<button className="bg-red-700 rounded-md text-white pl-4 pr-4 pt-1 pb-1 cursor-not-allowed" disabled={true}><BsTrash/></button>}
                    </td>
                    {
                      data.Sample_Status==='Approved By TM' ? <td className="border border-gray-300 pl-12 py-2 text-center max-w-72  overflow-x-auto flex gap-2"><button className="bg-indigo-700 hover:bg-indigo-900 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={handleReportView}>Non NABL</button><button className="bg-indigo-700 hover:bg-indigo-900 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={handleNABLView}>NABL</button></td>:<td className="border border-gray-300 pl-12 py-2 text-center max-w-72  overflow-x-auto flex gap-2"><button className="bg-gray-300 rounded-md px-4 py-1 cursor-not-allowed" disabled>Non NABL</button><button className="bg-gray-300 rounded-md pl-4 pr-4 pt-1 pb-1 cursor-not-allowed" disabled>NABL</button></td>
                    }
                  </>
                ):difference=== 'ParticularUser Sample History'?(
                    <>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Sample_Status}</td>
                      {
                        data.Sample_Status==='Approved By TM' ? <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button className="bg-indigo-700 hover:bg-indigo-900 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={handleReportView}>View</button></td>:<td className="border border-gray-300 px-4 pt-3 text-center cursor-not-allowed max-w-72  overflow-x-auto"><button className="bg-gray-300 rounded-md pl-4 pr-4 pt-1 pb-1 cursor-not-allowed" disabled>View</button></td>
                      }
                      
                      {
                      data.Active===true?<td className='border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto'><span className='text-green-600 font-semibold'>Active</span></td>:<td className='border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto'><span className='text-red-600 font-semibold'>Deleted</span></td> 
                      }
                    </>
                ):(
                  <td className='w-0'></td>
                )
              }
            </tr>
          </tbody>
  )
}

export default Samples
