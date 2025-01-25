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
  return (
          
          <tbody>
              <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Registration_Number}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Group}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Date.split('T')[0]}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">                 
                <button className="bg-indigo-700 hover:bg-indigo-900 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={handleRedirection}>View </button>
              </td>
              {
                difference==='All Sample History' ?(
                  <>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                      {data.Sample_Status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">                 
                    {data?.Sample_Status==='Forwarded To TM'?<button className="bg-red-700 hover:bg-red-800 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={()=>handleDelete(data._id)}><BsTrash/></button>:<button className="bg-red-700 rounded-md text-white pl-4 pr-4 pt-1 pb-1 cursor-not-allowed" disabled={true}><BsTrash/></button>}
                    </td>
                  </>
                ):difference=== 'ParticularUser Sample History'?(
                    <>
                      <td className="border border-gray-300 px-4 py-2 text-center">{data.Sample_Status}</td>
                      {
                        data.Sample_Status==='Approved By TM' ? <td className="border border-gray-300 px-4 py-2 text-center"><button className='center'><FaPrint /></button></td>:<td className="border border-gray-300 px-4 py-2 text-center cursor-not-allowed"><button className='center'><MdPrintDisabled /></button></td>
                      }
                      
                      {
                      data.Active===true?<td className='border border-gray-300 px-4 py-2 text-center'><span className='bg-green-600 text-white px-6 py-1 rounded-md'>Active</span></td>:<td className='border border-gray-300 px-4 py-2 text-center'><span className='bg-red-600 text-white px-4 py-1 rounded-md'>Deleted</span></td> 
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
