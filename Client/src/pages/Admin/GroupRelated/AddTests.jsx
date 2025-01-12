import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getGroupData, updateGroupData } from '../../../Redux/Slices/GroupSilce';
import toast from 'react-hot-toast';

const AddTests = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { groupData } = useSelector((state) => state.group);
    const [selectedGroup,setSelectedGroup]=useState('')
     const [typeOfTests, setTypeOfTests] = useState([{}]);
        const handleAddMore = () => {
            setTypeOfTestingFields([...typeOfTests,'']);
        };
        const handleInputChange = (index, e) => {
            const newFields = [...typeOfTests];
            newFields[index] = e.target.value;
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
        setSelectedGroup(filteredGroup[0]._id);
    }
    const handleSumbit=async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target)
        const GroupName=formData.get("GroupName");
        // const GroupID=formData.get("GroupID");
        const TypeOfTesting=formData.get("TypeOfTesting");
        const Tests=formData.get("Tests");
        console.log(GroupName,TypeOfTesting,Tests,"testka");
        const data={
            "Group_Name":GroupName,
            // "GroupID":GroupID,
            "GroupID":selectedGroup,
            "TypeOfTesting":TypeOfTesting,
            "Tests":Tests
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
        <div className='text-4xl w-full text-center p-4 font-bold'>Add Tests</div>
        <br /><br /><br />
        <div className='w-full'>
            <form className='flex flex-col w-1/2 h-96 mx-auto bg-slate-500 gap-5 justify-center px-10 rounded-md border-indigo-700 border-2' onSubmit={handleSumbit}>
                <div className='flex '>
                    <label htmlFor="" className='w-1/3 text-lg font-semibold'>Group:</label>
                    <select name="" id="" className='w-2/3 p-1 rounded-3xl' onChange={handleOnChange}>
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
                    <input type="text" disabled className='w-2/3 p-1 rounded-3xl' value={selectedGroup} />
                </div>
                <div className='flex'>
                    <label htmlFor="TypeOfTesting" className='w-1/3 text-lg font-semibold'>Enter Type Of Testing:</label>
                    <select name="TypeOfTesting" id="" className='w-2/3 p-1 rounded-3xl' onChange={handleOnChange}>
                        <option value="">Choose Type Of Testing</option>
                        {
                            groupData?.filter((item)=>item._id===selectedGroup).map((data)=>{
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
                    {typeOfTests.map((field, index) => (
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
                <div className='w-full flex justify-center'>
                    <button type="submit" className='w-1/3 py-1 ml-2 text-center text-white bg-indigo-700 rounded-md'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTests