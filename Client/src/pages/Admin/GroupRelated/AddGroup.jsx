import React ,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const AddGroup = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [groupFields, setGroupFields] = useState(['']);
    const handleAddMore = () => {
        setGroupFields([...groupFields,'']);
    };
    const handleInputChange = (index, e) => {
        const newFields = [...groupFields];
        newFields[index] = e.target.value;
        setGroupFields(newFields);
    };
    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const data={
            "Group_Names":groupFields,
            "Type_Of_Testing":[],
            "Tests":[]
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
    console.log(groupFields,"ty")
  return (
    <div>
        <div className='w-full flex border bg-gray-300 shadow-[0_0_6px_gray] border-gray-800 border-[3px] p-5'>
            <div className='w-3/5 text-3xl pr-24 font-bold'><span className='float-right'>Add Group</span></div>
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Home')}>Back</button></div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div>
        <form className='flex flex-col w-1/3 min-h-56 mx-auto bg-slate-400 gap-5 shadow-[0_0_6px_black] justify-center px-10 rounded-md border-slate-700 border-[3px]' onSubmit={handleSumbit}>
            <div className='flex w-full'>
                <label htmlFor="GroupName" className='text-lg w-1/5'>Name:<span className='text-red-600'>*</span></label>
                <div className='flex flex-col w-4/5'>
                    {groupFields.map((field, index) => (
                        <div key={`${field}-${index}`} className="mb-2 w-full">
                            <input
                                type="text"
                                name="GroupName"
                                placeholder='Enter Group Name'
                                value={field}
                                onChange={(e) => handleInputChange(index, e)}
                                className="w-full pl-4 rounded-3xl h-8 border-blue-700 border-2"
                            />
                        </div> 
                        ))}
                    </div>
                {/* <input type="text" placeholder='Enter Group Name' name="GroupName" className='w-4/5 h-8 rounded-3xl pl-4 border-blue-700 border-2' /> */}
            </div>
            <div className=" w-full ">
                <button
                    type="button"
                    onClick={handleAddMore}
                    className="text-sm text-white bg-indigo-700 py-1 px-4 float-right rounded-md"
                >
                    Add More
                </button>
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