import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getGroupData, updateGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const AddTypeOfTesting = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { groupData } = useSelector((state) => state.group);
    const [selectedGroupID,setSelectedGroupID]=useState('')
    const [typeOfTestingFields, setTypeOfTestingFields] = useState(['']);
    const handleAddMore = () => {
        if(typeOfTestingFields.length>14){
            toast.error("At Most 15 Type Of Testing Can Be Added At A Time")
        }
        else if(typeOfTestingFields.length<=14 && typeOfTestingFields.length>=0){
            setTypeOfTestingFields([...typeOfTestingFields,'']);
        }
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
    // Remove a  group from a specific test section
    const removeTypeOfTestingSection = (typeOfTestingIndex) => {
        if(typeOfTestingIndex>0){
        setTypeOfTestingFields((prev) =>
            prev.filter((_, i) =>
            i !== typeOfTestingIndex
            )
        );
        }
        else{
            toast.error("At least one Type Of Testing Should Be Added");
        }
    };
    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target)
        const GroupName=formData.get("GroupName")
        console.log(GroupName);
        if(typeOfTestingFields.length===0){
            toast.error("At least one Type Of Testing Should Be Added")
            return;
        }
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
    <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-repeat">
        <AdminCommomNav/>
            <div className='w-full p-4'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Group/TypeOfTestingList')}>Back</button></div>
        <br /><br /><br />
        <div className='w-full'>
            <form className='flex flex-col lg:w-1/2 w-4/5 min-h-96 mx-auto bg-gray-200 gap-5 shadow-[0_0_6px_gray] py-20 px-10 rounded-md border-blue-600 border-2' onSubmit={handleSumbit}>
                <div className='border-2 border-gray-700 flex flex-col gap-3 p-2'>
                    <div className='flex lg:flex-row flex-col'>
                        <label htmlFor="GroupName" className='lg:w-1/3 w-full text-lg font-semibold'>Group:</label>
                        <select name="GroupName" id="GroupID" className='lg:w-2/3 w-full p-1 rounded-3xl border border-blue-700 border-2 outline-0' onChange={handleOnChange}>
                            <option value="">Choose Group</option>
                            {
                                groupData.map((item)=>{
                                    return <option value={item.Group_Name} key={item._id}>{item.Group_Name}</option>
                                })
                            }    
                        </select>
                    </div>
                    <div className='flex lg:flex-row flex-col'>
                        <label htmlFor="TypeOfTesting" className='lg:w-1/3 w-full text-lg font-semibold'>Enter Type Of Testing:</label>
                        <div className='flex flex-col lg:w-2/3 w-full'>
                            {typeOfTestingFields.map((field, index) => (
                                    <div key={`${index}`} className="mb-2 w-full">
                                        <input
                                            type="text"
                                            name="TypeOfTesting"
                                            placeholder='Enter Type Of Testing Name'
                                            value={field}
                                            required
                                            onChange={(e) => handleInputChange(index, e)}
                                            className="w-full pl-4 p-1 rounded-3xl font-semibold border border-blue-700 border-2 outline-0"
                                        />
                                    </div> 
                                ))}
                        </div>
                    </div>
                </div>
                    <div className=" w-full ">
                        <button
                            type='button'
                            className="bg-red-500 text-white text-sm px-4 py-1 rounded float-left"
                            onClick={() => removeTypeOfTestingSection(typeOfTestingFields.length - 1)}
                        >
                            Remove
                        </button>
                        <button
                            type="button"
                            onClick={handleAddMore}
                            className="text-sm bg-green-500 text-white px-4 py-1 rounded float-right rounded-md"
                        >
                            Add Type Of Testing
                        </button>
                    </div>
                <div className='w-full flex justify-center'>
                    <button type="submit" className='w-1/3 py-1 text-center text-white bg-indigo-700 rounded-md hover:bg-indigo-900'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTypeOfTesting