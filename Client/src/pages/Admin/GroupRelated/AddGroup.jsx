import React ,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';

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

    // Remove a  group from a specific test section
  const removeGroupSection = (groupIndex) => {
    if(groupIndex>0){
      setGroupFields((prev) =>
        prev.filter((_, i) =>
          i !== groupIndex
        )
      );
    }
    else{
        toast.error("At least one Group Should Be Added");
    }
  };

    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(groupFields.length===0){
            toast.error("At least one Group Should Be Added")
            return;
        }
        // **Used Set to check for duplicate Group Names and Group Location Numbers**
        const nameSet = new Set();
        const locationSet = new Set();
        let hasDuplicates = false;

        groupFields.forEach((group, index) => {
            const { Group_Name, Group_Location_Number } = group;

            if (nameSet.has(Group_Name.trim())) {
                toast.error(`Duplicate Group Name found: "${Group_Name}" at index ${index + 1}`);
                hasDuplicates = true;
            } else {
                nameSet.add(Group_Name.trim());
            }

            if (locationSet.has(Group_Location_Number)) {
                toast.error(`Duplicate Group Location Number found: "${Group_Location_Number}" at index ${index + 1}`);
                hasDuplicates = true;
            } else {
                locationSet.add(Group_Location_Number);
            }
        });
        console.log(nameSet,"dw");
        if (hasDuplicates) return; // **Stop form submission if duplicates exist**

        const data={
            "Group_Names":groupFields,
            "Type_Of_Testing":[],
            "Tests":[]
        }
        const res=await dispatch(addGroupData(data));
        if(res?.payload?.success){
            toast.success("Group Added Successfully");
            navigate('/Admin/Group/GroupList');
        }
        else{
            toast.error("Something went Wrong");
        }
    }
    console.log(groupFields,"ty")
  return (
    <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
        <AdminCommomNav/>
            <div className=' w-full p-4'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Group/GroupList')}>Back</button></div>
        <br /><br /><br /><br /><br />
        <div >
        <form className='flex flex-col w-3/5 min-h-56 mx-auto bg-gray-200 gap-5 shadow-[0_0_6px_gray] justify-center px-10 rounded-md border-blue-600 border-2' onSubmit={handleSumbit}>
            <div className='flex w-full pt-8'>
                
                <div className='flex flex-col w-full'>
                    {groupFields?.map((field, index) => (
                        <div className='w-full flex lg:flex-row flex-col gap-4 border-2 border-gray-700 p-2 mb-5' key={`${index}`}>
                            <div className='flex flex-col w-full '>
                                <label htmlFor="GroupName" className='text-lg w-full'>Name:<span className='text-red-600'>*</span></label>
                                <input
                                type="text" 
                                id={`GroupID-${index}`}
                                name={`GroupName-${index}`}
                                placeholder='Enter Group Name'
                                value={field.Group_Name}
                                required
                                onChange={(e) => handleInputChange(index,"Group_Name", e.target.value)}
                                className="w-full mb-2 pl-4 rounded h-8 border-blue-700 border-2"
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="GroupName" className='text-lg w-full'>Group Location Number:<span className='text-red-600'>*</span></label>
                                <input type="number" name={`Group_Location_Number-${index}`} required id={`Group_Location_Number-${index}`} placeholder='Enter Group Location Number' className="w-full mb-2 pl-4 rounded h-8 border-blue-700 border-2" onChange={(e) => handleInputChange(index,"Group_Location_Number", e.target.value)}/>
                            </div>
                        </div>
                            
                            
 
                    ))}
                </div>
            </div>
            <div className=" w-full ">
                <button
                    type='button'
                    className="bg-red-500 text-white text-sm px-4 py-1 rounded float-left"
                    onClick={() => removeGroupSection(groupFields.length - 1)}
                >
                    Remove
                </button>
                <button
                    type="button"
                    onClick={handleAddMore}
                    className="text-sm bg-green-500 text-white px-4 py-1 rounded float-right rounded-md"
                >
                    Add Group
                </button>
            </div>
            <div className='w-full flex justify-center pb-8'>
                <button type="submit" className='px-6 py-1 text-white bg-indigo-700 rounded-md hover:bg-indigo-900'>Submit</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default AddGroup