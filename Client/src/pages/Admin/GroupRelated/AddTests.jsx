import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getGroupData, updateGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';

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
    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target)
        const GroupName=formData.get("GroupName");
        console.log(GroupName,typeOfTesting,typeOfTests,"testka");
        const data={
            "Group_Name":GroupName,
            "GroupID":selectedGroupID,
            "TypeOfTesting":typeOfTesting,
            "Tests":typeOfTests
        }
        const res=await dispatch(updateGroupData(data));
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
        <div className='w-full flex border bg-gray-300 shadow-[0_0_6px_gray] border-gray-800 border-[3px] p-5'>
            <div className='w-3/5 text-3xl font-bold pr-24'><span className='float-right'>Add Tests</span></div>
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Group/TestsList')}>Back</button></div>
        </div>
        <br /><br /><br /><br /><br />
        <div className='w-full'>
            <form className='flex flex-col w-1/2 min-h-96 mx-auto bg-slate-400 shadow-[0_0_6px_black] gap-5 justify-center px-10 rounded-md border-slate-700 border-[3px]' onSubmit={handleSumbit}>
                <div className='flex '>
                    <label htmlFor="GroupName" className='w-1/3 text-lg font-semibold'>Group:</label>
                    <select name="GroupName" id="" className='w-2/3 p-1 rounded-3xl border border-blue-700 border-2' onChange={handleOnChange}>
                        <option value="">Choose Group</option>
                        {
                            groupData.map((item)=>{
                                return <option value={item.Group_Name} key={item._id}>{item.Group_Name}</option>
                            })
                        }    
                    </select>
                </div>
                <div className='flex'>
                    <label htmlFor="TypeOfTesting" className='w-1/3 text-lg font-semibold'>Enter Type Of Testing:</label>
                    <select name="TypeOfTesting" id="" className='w-2/3 p-1 rounded-3xl border border-blue-700 border-2' onChange={(e)=>setTypeOfTesting(e.target.value)}>
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
                <div className='flex'>
                    <label htmlFor="Tests" className='w-1/3 text-lg font-semibold'>Enter Tests:</label>
                    {/* <input type="text" name='Tests' className='w-2/3 p-1 rounded-3xl' /> */}
                    <div className='w-2/3'>
                        {typeOfTests.map((field, index) => (
                            <div key={`${index}`} className="mb-2  full">
                                <input
                                    type="text"
                                    name="TypeOfTesting"
                                    placeholder='Enter Test Name'
                                    value={field.Test}
                                    onChange={(e) => handleInputChange(index, e)}
                                    className="w-full p-1 rounded-3xl pl-4 font-semibold border-blue-700 border-2"
                                /> 
                            </div>    
                            ))}
                    </div>
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
                    <button type="submit" className='w-1/3 py-1 ml-2 text-center text-white bg-indigo-700 rounded-md'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTests