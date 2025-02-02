import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getGroupData, updateGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';

const AddTests = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { groupData } = useSelector((state) => state.group);
    const [selectedGroupID,setSelectedGroupID]=useState('')
    const [typeOfTesting,setTypeOfTesting]=useState('')
     const [typeOfTests, setTypeOfTests] = useState([{
        Type_Of_Testing:'',
        Test:''
     }]);
        const handleAddMore = () => {
            setTypeOfTests([...typeOfTests,{
                Type_Of_Testing:'',
                Test:''
            }]);
        };
        const handleInputChange = (index, e) => {
            const newFields = [...typeOfTests];
            console.log(newFields,"koi",index);
            newFields[index].Type_Of_Testing=typeOfTesting;
            newFields[index].Test = e.target.value;
            setTypeOfTests(newFields);
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
    const removeTestSection = (testIndex) => {
        if(testIndex>0){
        setTypeOfTests((prev) =>
            prev.filter((_, i) =>
            i !== testIndex
            )
        );
        }
        else{
            toast.error("At least one Test Should Be Added");
        }
    };
    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target)
        const GroupName=formData.get("GroupName");
        console.log(GroupName,typeOfTesting,typeOfTests,"testka");
        if(typeOfTests.length===0){
            toast.error("At least one Test Should Be Added")
            return;
        }
        const data={
            "Group_Name":GroupName,
            "GroupID":selectedGroupID,
            "TypeOfTesting":typeOfTesting,
            "Tests":typeOfTests
        }
        const res=await dispatch(updateGroupData(data));
        if(res?.payload?.success){
            toast.success("Group Added Successfully");
            navigate('/Admin/Group/TestsList');
        }
        else{
            toast.error("Something went Wrong");
        }
    }

  return (
    <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center">
        <AdminCommomNav/>
            <div className='w-full p-4'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Group/TestsList')}>Back</button></div>
        <br /><br /><br />
        <div className='w-full'>
            <form className='flex flex-col xl:w-1/2 w-4/5 min-h-96 mx-auto bg-gray-200 shadow-[0_0_6px_gray] gap-5 pt-10 px-10 rounded-md border-blue-600 border-2' onSubmit={handleSumbit}>
                <div className='w-full border-2 border-gray-700 p-2 flex flex-col gap-3'>
                    <div className='flex lg:flex-row flex-col '>
                        <label htmlFor="GroupName" className='lg:w-1/3 w-full text-lg font-semibold'>Group:</label>
                        <select name="GroupName" id="" className='lg:w-2/3 w-full p-1 rounded-3xl border-blue-700 border-2 outline-0' onChange={handleOnChange}>
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
                        <select name="TypeOfTesting" id="" className='lg:w-2/3 w-full p-1 rounded-3xl border-blue-700 border-2 outline-0' onChange={(e)=>setTypeOfTesting(e.target.value)}>
                            <option value="">Choose Type Of Testing</option>
                            {
                                groupData?.filter((item)=>item._id===selectedGroupID).map((data)=>{
                                    {console.log("hrhr")}
                                    return data.Type_Of_Testing.map((TOT)=>{
                                        {console.log("jykuui",TOT)}
                                        return <option value={TOT} key={`${TOT}-${data._id}`}>{TOT}</option>
                                    })
                                    
                                })
                            }    
                        </select>
                    </div>
                </div>
                <div className='flex lg:flex-row flex-col border-2 border-gray-700 p-2'>
                    <label htmlFor="Tests" className='lg:w-1/3 w-full text-lg font-semibold'>Enter Tests:</label>
                    <div className='lg:w-2/3 w-full'>
                        {typeOfTests.map((field, index) => (
                            <div key={`${index}`} className="mb-2  full">
                                <input
                                    type="text"
                                    name="TypeOfTesting"
                                    placeholder='Enter Test Name'
                                    value={field.Test}
                                    required
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-1 rounded-3xl pl-4 font-semibold border-blue-700 border-2 outline-0"
                                /> 
                            </div>    
                            ))}
                    </div>
                </div>
                <div className=" w-full ">
                        <button
                            type='button'
                            className="bg-red-500 text-white text-sm px-4 py-1 rounded float-left"
                            onClick={() => removeTestSection(typeOfTests.length - 1)}
                        >
                            Remove
                        </button>
                        <button
                            type="button"
                            onClick={handleAddMore}
                            className="text-sm bg-green-500 text-white px-4 py-1 rounded float-right rounded-md"
                        >
                            Add Test
                        </button>
                </div>
                <div className='w-full flex justify-center'>
                    <button type="submit" className='w-1/3 py-1 ml-2 text-center text-white bg-indigo-700 rounded-md hover:bg-indigo-900'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTests