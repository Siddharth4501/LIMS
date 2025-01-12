import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const AddGroup = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target)
        const GroupName=formData.get("GroupName")
        console.log(GroupName);
        const data={
            "Group_Name":GroupName,
        }
        const res=await dispatch(addGroupData(data));
        if(res?.payload?.success){
            toast.success("Group Added Successfully");
            navigate('/Admin/Home');
        }
        else{
            toast.error("Something went Wrong");
        }
    }
  return (
    <div>
        <div>
        <form className='flex flex-col w-1/3 h-56 mx-auto bg-slate-500 gap-5 justify-center px-10 rounded-md border-indigo-700 border-2' onSubmit={handleSumbit}>
            <div className='flex w-full'>
                <label htmlFor="GroupName" className='text-lg w-1/5'>Name:<span className='text-red-600'>*</span></label>
                <input type="text" placeholder='Enter Group Name' name="GroupName" className='w-4/5 h-8 rounded-3xl pl-4 border-blue-700 border-2' />
            </div>
            <div className='w-full flex justify-center'>
                <button type="submit" className='px-6 py-1 text-white bg-indigo-700 rounded-md hover:bg-indigo-900'>Submit</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default AddGroup