import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateTMANData } from '../../Redux/Slices/SampleSlice';
import toast from 'react-hot-toast';

const TM_ResultApprovalViewMore = () => {
    const {state}=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const [substances,setSubstance]=useState(state.Substances_To_Be_Analysed)
    console.log(substances,"opin");
    const handleResultChange=(e,typeOfTesting,test)=>{
        const { value } = e.target;
        setSubstance((prevState) => ({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],//always destructured in an object
                Tests:prevState[typeOfTesting].Tests.map((item) =>//prevState[typeOfTesting] represent previous value of the key 
                item.Test===test
                    ? { ...item, Result: parseInt(value) || 0 }
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
            "clickedAnalystID":state.analystClicked.Analyst.ID
        }
        console.log(data,"hehe")
        const res=await dispatch(updateTMANData(data))
        if(res?.payload?.success){
            //here in res?.payload?.success ,the success parameter comes from res.json at backend
            toast.success("result added successfully")
            navigate('/ResultApproval')
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
        <div className='w-full flex border bg-gray-300 p-5'>
            <div className='w-3/5 text-3xl font-bold'><span className='float-right'>Result Approval Page</span></div>
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/ResultApproval/Result_Status',{state:{...state}})}>Back</button></div>
        </div>
        <br /><br />
        {
            state.analystClicked.Status==='Pending For Approval At TM'?(
            Object.keys(state.Substances_To_Be_Analysed).map((key,i) => {
                { console.log(state.Substances_To_Be_Analysed[key], "klfk") }
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
                                                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">{index + 1}.</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Test}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Method}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Unit}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center"><input type="number" name={`Result-${item.Test}`} id={`Result-${item.Test}`} min={0} defaultValue={item.Result} onChange={(e)=>handleResultChange(e,key,item.Test)} className='text-center bg-zinc-300 rounded-md w-20' /></td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                                    <input type="date" disabled={true} name={`Start_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2 text-center' defaultValue={item.Start_Date}/>----<input type="date" name={`End_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2 text-center' defaultValue={item.End_Date} disabled={true}/>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                        
                                    })}
                            </table>
                        </div>



                    </div>
                )
            })):(
                <div className='text-2xl font-semibold w-full text-center'>Resuls Still Pending At Analyst.......</div>
            )
            }

    <br />
    {
        state.analystClicked.Status==='Pending For Approval At TM'?(
            <div className='w-full flex justify-center gap-5'>
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