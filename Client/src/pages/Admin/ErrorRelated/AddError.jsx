import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getGroupData} from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';
import { saveError } from '../../../Redux/Slices/ExtraSlice';

const AddError = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { groupData } = useSelector((state) => state.group);
    const [selectedGroupID,setSelectedGroupID]=useState('')
    const [typeOfTesting,setTypeOfTesting]=useState('')
    const [errorMsg, setErrorMsg] = useState('');
        
        const handleInputChange = (e) => {
            const {value}=e.target;
            console.log(value,"erro")
            setErrorMsg(value);
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
        const GroupName=formData.get("GroupName");
        console.log(GroupName,typeOfTesting,errorMsg,"testka");
        if(!GroupName || !selectedGroupID || !typeOfTesting || !errorMsg){
            toast.error("At fields are required");
            return;
        }
        const data={
            "GroupID":selectedGroupID,
            "GroupName":GroupName,
            "TypeOfTesting":typeOfTesting,
            "Error_Msg":errorMsg
        }
        const res=await dispatch(saveError(data));
        if(res?.payload?.success){
            toast.success("ErrorAdded Successfully");
            navigate('/Admin/Error/ErrorList');
        }
        else{
            toast.error("Something went Wrong");
        }
    }
  return (
    <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
        <AdminCommomNav/>
            <div className='w-full p-4'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Error/ErrorList')}>Back</button></div>
        <br /><br /><br />
        <div className='w-full'>
            <form className='flex flex-col xl:w-1/2 w-4/5 min-h-96 mx-auto bg-gray-200 shadow-[0_0_6px_gray] gap-5 pt-10 px-10 rounded-md border-blue-600 border-2' onSubmit={handleSumbit}>
                <div className='w-full flex flex-col gap-3'>
                    <div className='flex lg:flex-row flex-col '>
                        <label htmlFor="GroupName" className='lg:w-1/3 w-full text-lg font-semibold'>Group:</label>
                        <select name="GroupName" id="" className='lg:w-2/3 w-full p-1 rounded border-blue-700 border-2 outline-0' onChange={handleOnChange}>
                            <option value="">Choose Group</option>
                            {
                                groupData.map((item)=>{
                                    return <option value={item.Group_Name} key={item._id}>{item.Group_Name}</option>
                                })
                            }    
                        </select>
                    </div>
                    <div className='flex lg:flex-row flex-col'>
                        <label htmlFor="TypeOfTesting" className='lg:w-1/3 w-full text-lg font-semibold'>Type Of Testing:</label>
                        <select name="TypeOfTesting" id="" className='lg:w-2/3 rounded w-full p-1 border-blue-700 border-2 outline-0' onChange={(e)=>setTypeOfTesting(e.target.value)}>
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
                <div className='flex lg:flex-row flex-col'>
                    <label htmlFor="Tests" className='lg:w-1/3 w-full text-lg font-semibold'>Error Message:</label>
                    <div className='lg:w-2/3 w-full'>
                        <div className="mb-2 full">
                            <input
                                type="text"
                                name="TypeOfTesting"
                                placeholder='Enter Test Name'
                                value={errorMsg}
                                required
                                onChange={(e) => handleInputChange(e)}
                                className="w-full p-1 rounded pl-2 font-semibold border-blue-700 border-2 outline-0"
                            /> 
                        </div>  
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <button type="submit" className='w-1/3 py-1 ml-2 text-center text-white bg-indigo-700 rounded-md hover:bg-indigo-900'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddError