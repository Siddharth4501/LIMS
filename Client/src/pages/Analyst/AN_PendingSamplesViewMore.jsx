import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { updateTMANData } from '../../Redux/Slices/SampleSlice';
import toast from 'react-hot-toast';

const AN_PendingSamplesViewMore = () => {
    const {state}=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=JSON.parse(localStorage.getItem("userData"));
    console.log(state,state.TMANID,"hjtyj");
    const [substances,setSubstance]=useState(state.Substances_To_Be_Analysed)
    console.log(substances,"opin");

    const handleResultChange=(e,typeOfTesting,test)=>{
        const { value } = e.target;
        setSubstance((prevState) => ({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],//always destructured in an object
                Tests:prevState[typeOfTesting].Tests.map((item) =>//prevState[typeOfTesting] represent previous value of the key 
                item.Test === test
                    ? { ...item, Result: parseInt(value) || 0 }
                    : item
                ),
            } 
          }));
    }
    const handleStartDate=(e,typeOfTesting,test)=>{
        const {value}=e.target;
        setSubstance((prevState)=>({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],
                Tests: prevState[typeOfTesting].Tests.map((item) =>
                    item.Test === test ? { ...item, Start_Date: value } : item
                  ),
            }
        }));
    }
    const handleEndDate=(e,typeOfTesting,test)=>{
        const {value}=e.target;
        setSubstance((prevState)=>({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],
                Tests: prevState[typeOfTesting].Tests.map((item) =>
                    item.Test === test ? { ...item, End_Date: value } : item
                ),
            }
        }));
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={
            "TMANID":state.TMANID,
            "Substances_To_Be_Analysed":substances,
            "currentUserID":userData._id,
            "TM_Status":"Pending For Approval At TM"
        }
        console.log(data,"hehe")
        const res=await dispatch(updateTMANData(data))
        if(res?.payload?.success){
            //here in res?.payload?.success ,the success parameter comes from res.json at backend
            toast.success("result added successfully")
            navigate('/AN_PendingSamples')
          }
        else {
          toast.error("Something Went Wrong");
        }
    }
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className='flex border bg-gray-300 text-3xl justify-center font-bold p-5'>
              Add Result Page
          </div>
          <br /><br />
          {
              Object.keys(state.Substances_To_Be_Analysed).map((key,i) => {
                  { console.log(state.Substances_To_Be_Analysed[key], "klfk") }
                  return (
                      <div className='flex flex-col mb-10' key={`${key}-${i}`}>
                          <div className='bg-slate-100 flex gap-20 p-2'>
                              <div>
                                  <b>Type Of Testing:</b> <span className='font-semibold'>{key}</span>
                              </div>
                              {/* <div className='flex gap-2'>
                                  <b>Start Date:</b>
                                  <input type="date" name={`Start_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2' onChange={(e)=>handleStartDate(e,key)}/>
                              </div>
                              <div className='flex gap-2'>
                                  <b>End Date:</b>
                                  <input type="date" name={`End_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2' onChange={(e)=>handleEndDate(e,key)}/>
                              </div> */}
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
                                          <th className="border border-gray-300 px-4 py-2 text-center">Start Date-End Date</th>
                                      </tr>
                                  </thead>
                                  {
                                      state.Substances_To_Be_Analysed[key].Tests.filter((data)=>data.Analyst.ID===userData._id).map((item, index) => {
                                          return (
                                              <tbody key={`${key}-${index}`}>

                                                  <tr className="hover:bg-gray-100">
                                                      <td className="border border-gray-300 px-4 py-2 text-center font-bold">{index + 1}.</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">{item.Test}</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">{item.Method}</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">{item.Unit}</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center"><input type="number" name={`Result-${item.Test}`} id={`Result-${item.Test}`} defaultValue={0} min={0} required onChange={(e)=>handleResultChange(e,key,item.Test)} className='text-center bg-zinc-300 rounded-md w-20' /></td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">
                                                      <input type="date" name={`Start_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2' onChange={(e)=>handleStartDate(e,key,item.Test)}/>-<input type="date" name={`End_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 px-1 mb-2' onChange={(e)=>handleEndDate(e,key,item.Test)}/>
                                                      </td>
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
        <div className='w-full'>
            <button type='submit' className='bg-indigo-700 text-white px-20 py-2 text-sm rounded-md mx-auto flex justify-center hover:bg-indigo-900 '>Upload Result</button>
        </div>
      </div>
    </form>

  )
}

export default AN_PendingSamplesViewMore