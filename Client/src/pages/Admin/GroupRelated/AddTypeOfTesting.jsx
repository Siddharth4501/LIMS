import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getGroupData, updateGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';

const AddTypeOfTesting = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { groupData } = useSelector((state) => state.group);
    const [selectedGroupID,setSelectedGroupID]=useState('')
    const [typeOfTestingFields, setTypeOfTestingFields] = useState([]);
    const handleAddMore = () => {
        setTypeOfTestingFields([...typeOfTestingFields,'']);
    };
    const handleInputChange = (index, e) => {
        const newFields = [...typeOfTestingFields];
        newFields[index] = e.target.value;
        setTypeOfTestingFields(newFields);
    };
    useEffect(() => {
        (async () => {
        await dispatch(getGroupData());
        })();
    }, []);
    console.log(groupData);
    const handleOnChange=(e)=>{
        const {value} =e.target;
        const filteredGroup=groupData?.filter((item)=>item.Group_Name===value)
        console.log(filteredGroup)
        setSelectedGroupID(filteredGroup[0]._id);
    }
    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target)
        const GroupName=formData.get("GroupName")
        // const GroupID=formData.get("GroupID");
        // const TypeOfTesting=formData.get("TypeOfTesting");
        console.log(GroupName);
        const data={
            "Group_Name":GroupName,
            "GroupID":selectedGroupID,
            "TypeOfTesting":typeOfTestingFields,
            "Tests":[]
        }
        const res=await dispatch(updateGroupData(data));
        if(res?.payload?.success){
            toast.success("Type Of Testing added Successfully");
            navigate('/Admin/Home');
        }
        else{
            toast.error("Something went Wrong");
        }
    }

  return (
    <div>
        <div className='text-4xl w-full text-center p-4 font-bold'>Add Type Of Testing</div>
        <br /><br /><br />
        <div className='w-full'>
            <form className='flex flex-col w-1/2 h-96 mx-auto bg-slate-500 gap-5 justify-center px-10 rounded-md border-indigo-700 border-2' onSubmit={handleSumbit}>
                <div className='flex'>
                    <label htmlFor="GroupName" className='w-1/3 text-lg font-semibold'>Group:</label>
                    <select name="GroupName" id="" className='w-2/3 p-1 rounded-3xl' onChange={handleOnChange}>
                        <option value="">Choose Group</option>
                        {
                            groupData.map((item)=>{
                                return <option value={item.Group_Name} key={item._id}>{item.Group_Name}</option>
                            })
                        }    
                    </select>
                </div>
                <div className='flex'>
                    <label htmlFor="" className='w-1/3 text-lg font-semibold'>Group ID:</label>
                    <input type="text" disabled className='w-2/3 p-1 rounded-3xl' value={selectedGroupID} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="TypeOfTesting" className='w-1/3 text-lg font-semibold'>Enter Type Of Testing:</label>
                    {/* <input type="text" name='TypeOfTesting' className='w-2/3 p-1 rounded-3xl' /> */}
                    {typeOfTestingFields.map((field, index) => (
                            <div key={`${field}-${index}`} className="mb-2">
                                <input
                                    type="text"
                                    name="TypeOfTesting"
                                    value={field}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-2/3 p-1 rounded-3xl"
                                />
                            </div> 
                        ))}
                    </div>
                    <div className="flex justify-start mb-4">
                        <button
                            type="button"
                            onClick={handleAddMore}
                            className="text-sm text-white"
                        >
                            Add More
                        </button>
                </div>
                <div className='w-full flex justify-center'>
                    <button type="submit" className='w-1/3 py-1 ml-2 text-center text-white bg-indigo-700 rounded-md'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTypeOfTesting