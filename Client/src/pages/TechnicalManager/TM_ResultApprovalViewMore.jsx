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
    const handleResultChange=(e,typeOfTesting,testIndex)=>{
        const { value } = e.target;
        setSubstance((prevState) => ({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],//always destructured in an object
                Tests:prevState[typeOfTesting].Tests.map((item, index) =>//prevState[typeOfTesting] represent previous value of the key 
                index === testIndex
                    ? { ...item, Result: parseInt(value) || 0 }
                    : item
                ),
            } 
            }));
    }
    const handleAccept=async()=>{
        const data={
            "ID":state.ID,
            "Substances_To_Be_Analysed":substances,
            "AN_Status":"Approved By TM"
        }
        console.log(data,"hehe")
        const res=await dispatch(updateTMANData(data))
        if(res?.payload?.success){
            //here in res?.payload?.success ,the success parameter comes from res.json at backend
            toast.success("result added successfully")
            navigate('/')
          }
        else {
          toast.error("Something Went Wrong");
        }
    }
    const handleReject=()=>{

    }
  return (
    
    <div>
        <div className='w-full flex border bg-gray-300 p-5'>
            <div className='w-3/5 text-3xl font-bold'><span className='float-right'>Result Approval Page</span></div>
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/ResultApproval')}>Back</button></div>
        </div>
        <br /><br />
        {
            Object.keys(state.Substances_To_Be_Analysed).map((key) => {
                { console.log(state.Substances_To_Be_Analysed[key], "klfk") }
                return (
                    <div className='flex flex-col mb-10'>
                        <div className='bg-slate-100 flex gap-20 p-2'>
                            <div>
                                <b>Type Of Testing:</b> <span className='font-semibold'>{key}</span>
                            </div>
                            <div className='flex gap-2'>
                                <b>Start Date:</b>
                                <input type="date" name={`Start_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2' value={state.Substances_To_Be_Analysed[key].Start_Date}/>
                            </div>
                            <div className='flex gap-2'>
                                <b>End Date:</b>
                                <input type="date" name={`End_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2' value={state.Substances_To_Be_Analysed[key].End_Date}/>
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
                                        {/* <th className="border border-gray-300 px-4 py-2 text-center">Upload Excel</th> */}
                                    </tr>
                                </thead>
                                {
                                    state.Substances_To_Be_Analysed[key].Tests.map((item, index) => {
                                        return (
                                            <tbody>

                                                <tr className="hover:bg-gray-100" key={item._id}>
                                                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">{index + 1}.</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Test}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Method}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Unit}</td>
                                                    <td className="border border-gray-300 px-4 py-2 text-center"><input type="number" name={`Result-${item.Test}`} id={`Result-${item.Test}`} min={0} defaultValue={item.Result} onChange={(e)=>handleResultChange(e,key,index)} className='text-center bg-zinc-300 rounded-md w-20' /></td>
                                                    {/* <td className="border border-gray-300 px-4 py-2 text-center">
                                                        <input type="file" name="Test Result Excel" id="Test Result Excel" />
                                                    </td> */}
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                            </table>
                        </div>



                    </div>
                )
            })}

    <br />
    <div className='w-full flex justify-center gap-5'>
        <button type='submit' className='bg-indigo-700 text-white px-20 py-2 text-sm rounded-md  hover:bg-indigo-900' onClick={handleAccept}>Accept</button>
        <button type='submit' className='bg-sky-400 text-white px-20 py-2 text-sm rounded-md hover:bg-sky-900 ' onClick={handleReject}>Reject</button>
    </div>
    </div>
    
  )
}

export default TM_ResultApprovalViewMore