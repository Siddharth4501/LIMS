import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSample, updateTMANData } from '../../Redux/Slices/SampleSlice';
import toast from 'react-hot-toast';
import UserCommonNav from '../../components/UserCommonNav';

const TM_ResultApprovalViewMore = () => {
    const {state}=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const [substances,setSubstance]=useState(state.Substances_To_Be_Analysed)
    
    console.log(substances,"opin");
    const handleResultChange=(e,typeOfTesting,testID)=>{
        const { value } = e.target;
        setSubstance((prevState) => ({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],//always destructured in an object
                Tests:prevState[typeOfTesting].Tests.map((item) =>//prevState[typeOfTesting] represent previous value of the key 
                item.Test.TestID===testID
                    ? { ...item, Result: value || "" }
                    : item
                ),
            } 
            }));
    }
    const handleAccept=async()=>{
        const data={
            "TMANID":state.TMANID,
            "Substances_To_Be_Analysed":substances,
            "TM_Status":"Approved By TM",
            "clickedAnalystID":state.analystClicked.Analyst.ID,
            "NABL_Page":false
        }
        console.log(data,"hehe")
        const res=await dispatch(updateTMANData(data))
        if(res?.payload?.success){
            //here in res?.payload?.success ,the success parameter comes from res.json at backend
            const ID=state.Sample_Alloted;
            const presentDate=new Date();
            const obj={
                "ID":ID,
                "TMANID":state.TMANID,
                "Status":"Approved By TM",
                "completionDate":presentDate
            };
            const response=await dispatch(updateSample(obj))
            if(response?.payload?.success){
                //here in res?.payload?.success ,the success parameter comes from res.json at backend
                toast.success("result added successfully")
                navigate('/ResultApproval')
            }
            
          }
        else {
          toast.error("Something Went Wrong");
        }
    }
    const handleReject=async()=>{
        const data={
            "TMANID":state.TMANID,
            "Substances_To_Be_Analysed":substances,
            "TM_Status":"Rejected By TM",
            "clickedAnalystID":state.analystClicked.Analyst.ID
        }
        console.log(data,"hehe")
        const res=await dispatch(updateTMANData(data))
        if(res?.payload?.success){
            //here in res?.payload?.success ,the success parameter comes from res.json at backend
            toast.success("Result Rejected")
            navigate('/ResultApproval')
          }
        else {
          toast.error("Something Went Wrong");
        }
    }
  return (
    
    <div>
        <UserCommonNav assignedRole='Technical Manager'/>
        <div className='w-full flex p-5'>
            <div className='w-full'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/ResultApproval/Result_Status',{state:{...state}})}>Back</button></div>
        </div>
        {
            state.analystClicked.Status==='Pending For Approval At TM'?(
            Object.keys(state.Substances_To_Be_Analysed).map((key,i) => {
                { console.log(state.Substances_To_Be_Analysed[key], "klfk") }
                const filteredItem=state.Substances_To_Be_Analysed[key].Tests.filter((data)=>data.Analyst.ID===state.analystClicked.Analyst.ID )
                if(filteredItem.length>0){
                    return (
                        <div className='flex flex-col mb-10' key={`${key}-${i}`}>
                            <div className='bg-slate-100 flex gap-20 p-2'>
                                <div>
                                    <b>Type Of Testing:</b> <span className='font-semibold'>{key}</span>
                                </div>
                            </div>
    
                            <div>
                                <table className='"table-auto w-full border-collapse border border-gray-300'>
                                    <thead>
                                        <tr className="bg-slate-200">
                                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                                            <th className="border border-gray-300 px-4 py-2 text-center">Tests</th>
                                            <th className="border border-gray-300 px-4 py-2 text-center">Method</th>
                                            <th className="border border-gray-300 px-4 py-2 text-center">Unit</th>
                                            <th className="border border-gray-300 px-4 py-2 text-center">Result</th>
                                            <th className="border border-gray-300 px-4 py-2 text-center">Start Date--End Date</th>
                                        </tr>
                                    </thead>
                                    {
                                        state.Substances_To_Be_Analysed[key].Tests.filter((data)=>data.Analyst.ID===state.analystClicked.Analyst.ID ).map((item, index) => {
                                            
                                            return (
                                                <tbody key={`${key}-${index}`}>
                                                    <tr className="hover:bg-gray-100">
                                                        <td className="border border-gray-300 px-4 py-2 text-center font-bold max-w-72  overflow-x-auto">{index + 1}.</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Test.Test_Name}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Method}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Unit}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><input type="text" name={`Result-${item.Test}`} id={`Result-${item.Test}`} min={0} defaultValue={item.Result} onChange={(e)=>handleResultChange(e,key,item.Test.TestID)} className='text-center bg-zinc-300 rounded-md min-w-8 p-1' /></td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">
                                                        <input type="date" disabled={true} name={`Start_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 p-1 mb-2 text-center rounded' defaultValue={item.Start_Date.split('T')[0]}/>----<input type="date" name={`End_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 p-1 mb-2 text-center rounded' defaultValue={item.End_Date.split('T')[0]} disabled={true}/>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                            
                                        })}
                                </table>
                            </div>
    
    
    
                        </div>
                    )
                }
            })
        ):(
                <div className='text-2xl font-semibold w-full text-center'>Resuls Still Pending At Analyst.......</div>
            )
            }

    <br />
    {
        state.analystClicked.Status==='Pending For Approval At TM'?(
            <div className='w-full flex justify-center gap-5 mb-16'>
                <button type='submit' className='bg-indigo-700 text-white px-20 py-2 text-sm rounded-md  hover:bg-indigo-900' onClick={handleAccept}>Accept</button>
                <button type='submit' className='bg-sky-400 text-white px-20 py-2 text-sm rounded-md hover:bg-sky-900 ' onClick={handleReject}>Reject</button>
            </div>
        ):(
            <span></span>
        )
    }
    </div>
    
  )
}

export default TM_ResultApprovalViewMore