import React ,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const AddGroup = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [groupFields, setGroupFields] = useState([{
        "Group_Name":'',
        "Group_Location_Number":0
    }]);
    const handleAddMore = () => {
        if(groupFields.length>14){
            toast.error("At Most 15 Groups Can Be Added At A Time")
        }
        else if(groupFields.length<=14 && groupFields.length>=0){
            setGroupFields([...groupFields,{
                "Group_Name":'',
                "Group_Location_Number":0
            }]);
        }
    };
    const handleInputChange = (index,field, value) => {
        const newFields = [...groupFields];
        newFields[index][field] = value;
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
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Group/GroupList')}>Back</button></div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div>
        <form className='flex flex-col w-1/3 min-h-56 mx-auto bg-slate-400 gap-5 shadow-[0_0_6px_black] justify-center px-10 rounded-md border-slate-700 border-[3px]' onSubmit={handleSumbit}>
            <div className='flex w-full'>
                <label htmlFor="GroupName" className='text-lg w-1/5'>Name:<span className='text-red-600'>*</span></label>
                <div className='flex flex-col w-4/5'>
                    {groupFields.map((field, index) => (
                            <div className='w-full' key={`${index}`}>
                                <input
                                type="text" 
                                id={`GroupName-${index}`}
                                name={`GroupName-${index}`}
                                placeholder='Enter Group Name'
                                value={field.Group_Name}
                                onChange={(e) => handleInputChange(index,"Group_Name", e.target.value)}
                                className="w-full mb-2 pl-4 font-semibold rounded-3xl h-8 border-blue-700 border-2"
                                />
                                <input type="number" name={`Group_Location_Numbe-${index}`} id={`Group_Location_Numbe-${index}`} placeholder='Enter Group Location Number' className="w-full mb-2 pl-4 font-semibold rounded-3xl h-8 border-blue-700 border-2" onChange={(e) => handleInputChange(index,"Group_Location_Number", e.target.value)}/>
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