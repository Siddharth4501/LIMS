import React, { useState } from 'react'
import AdminCommomNav from '../../../components/AdminCommomNav'
import AdminCommonPanel from '../../../components/AdminCommonPanel'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { saveNameOfLab } from '../../../Redux/Slices/ExtraSlice'

const NameOfLab = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [LabName,setLabName]=useState();
  const handleSubmit=async()=>{
    if(!LabName){
      toast.error("Lab Name is required");
      return
    }
    const data={
      "Lab_Name":LabName,
    }

    try{
      const res=await dispatch(saveNameOfLab(data));
        if(res?.payload?.success){
            toast.success("Name Of Lab Saved Successfully");
            navigate('/Admin/Home');
        }
        else{
            toast.error("Something went Wrong");
        }
    }
    catch(e){
      toast.error("Something Went Wrong");
    }
  }
  return (
    <>
      <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center">
          <AdminCommomNav />
          <div className='flex'>
              <AdminCommonPanel/>
              <div className='w-full'>
                <br /><br /><br /><br /><br />
                  <div className='flex flex-col gap-2 w-1/2 justify-center m-auto h-72 border-2 bg-gray-200 shadow-[0_0_6px_gray] border-blue-700 items-center'>
                    <div className='text-xl font-semibold'>Name Of Lab:</div>
                    <div className='w-full'><input type="text" placeholder='Enter Name Of Lab...' className='w-3/4 flex justify-center mx-auto h-8 p-2 border-2 bg-white border-blue-600 font-semibold outline-0' onChange={(e)=>setLabName(e.target.value)} /></div>
                    <div><button className='px-4 py-1 bg-indigo-700 hover:bg-indigo-900 text-white rounded-md mt-1' onClick={handleSubmit}>Submit</button></div>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default NameOfLab