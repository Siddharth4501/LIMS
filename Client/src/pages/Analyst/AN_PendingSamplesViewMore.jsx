import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { updateTMANData } from '../../Redux/Slices/SampleSlice';
import toast from 'react-hot-toast';
import * as XLSX from "xlsx";

const AN_PendingSamplesViewMore = () => {
    const {state}=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=JSON.parse(localStorage.getItem("userData"));
    console.log(state,state.TMANID,"hjtyj");
    const [substances,setSubstance]=useState(state.Substances_To_Be_Analysed)
    const [resultColumn, setResultColumn] = useState([]);
    console.log(substances,"opin");

    const handleResultChange=(e,typeOfTesting,testID,index)=>{
        const { value } = e.target;
        if(resultColumn.length>0){
            setResultColumn((prev) => {
                return prev.map((item, idx) =>
                  idx === index ? { ...item, Result: value } : item
                );
              });
        }
        console.log(setResultColumn,"hkfw")
        setSubstance((prevState) => ({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],//always destructured in an object
                Tests:prevState[typeOfTesting].Tests.map((item) =>//prevState[typeOfTesting] represent previous value of the key 
                item.Test.TestID === testID
                    ? { ...item, Result: value || "0" }
                    : item
                ),
            } 
          }));
    }
    const handleStartDate=(e,typeOfTesting,testID)=>{
        const {value}=e.target;
        setSubstance((prevState)=>({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],
                Tests: prevState[typeOfTesting].Tests.map((item) =>
                    item.Test.TestID === testID ? { ...item, Start_Date: value } : item
                  ),
            }
        }));
    }
    const handleEndDate=(e,typeOfTesting,testID)=>{
        const {value}=e.target;
        setSubstance((prevState)=>({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],
                Tests: prevState[typeOfTesting].Tests.map((item) =>
                    item.Test.TestID === testID ? { ...item, End_Date: value } : item
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
    const handleExcelFileUpload=(e)=>{
        const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert sheet to JSON
        const extractedData=[]
        // Extract the "Result" column
        jsonData.map((row) => {
            const obj={
            Name: row["Name"],    // Assuming the "Name" column exists
            Result: row["Result"], // Assuming the "Result" column exists
          }
          extractedData.push(obj);
        }); // Assuming "Result" is the column name
        setResultColumn(extractedData);
      };

      reader.readAsArrayBuffer(file); // Read the file as a binary array
    }
  };
  console.log(resultColumn,"yup")
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className='flex border bg-gray-300 text-3xl justify-center font-bold p-5'>
              Add Result Page
          </div>
          <br /><br />
          <div className='w-full'>
            <input type="file" accept=".xlsx,.xls" name="ExcelFileInput" id="ExcelFileInput" onChange={handleExcelFileUpload} className='float-right bg-slate-200 p-1'/>
          </div>
          <br /><br />
          {
              Object.keys(state.Substances_To_Be_Analysed).map((key,i) => {
                  { console.log(state.Substances_To_Be_Analysed[key], "klfk") }
                  const filteredItem=state.Substances_To_Be_Analysed[key].Tests.filter((data)=>data.Analyst.ID===userData._id)
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
                                              <th className="border border-gray-300 px-4 py-2 text-center">Start Date-End Date</th>
                                          </tr>
                                      </thead>
                                      {
                                          state.Substances_To_Be_Analysed[key].Tests.filter((data)=>data.Analyst.ID===userData._id).map((item, index) => {
                                            {console.log(index,resultColumn[index],"liop")}
                                              return (
                                                
                                                  <tbody key={`${key}-${index}`}>
                                                    <tr className="hover:bg-gray-100">
                                                        <td className="border border-gray-300 px-4 py-2 text-center font-bold">{index + 1}.</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Test.Test_Name}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Method}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Unit}</td>
                                                
                                                        <td className="border border-gray-300 px-4 py-2 text-center"><input type="text" name={`Result-${item.Test.Test_Name}`} id={`Result-${item.Test.Test_Name}`} 
                                                        value={
                                                            resultColumn.length > 0 &&
                                                            resultColumn[index] &&
                                                            resultColumn[index].Name.trim() === item.Test.Test_Name.trim()
                                                                ? resultColumn[index].Result
                                                                : "0"
                                                            } required onChange={(e)=>handleResultChange(e,key,item.Test.TestID,index)} className='text-center bg-zinc-300 rounded-md min-w-8 p-1' />
                                                        </td>
                                                            
                                                        
                                                        
                                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                                        <input type="date" name={`Start_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 p-1 m-2 rounded' onChange={(e)=>handleStartDate(e,key,item.Test.TestID)}/>-<input type="date" name={`End_Date-${key}`} id={`Start_Date-${key}`} className='bg-zinc-300 p-1 mb-2 rounded' onChange={(e)=>handleEndDate(e,key,item.Test.TestID)}/>
                                                        </td>
                                                    </tr>
                                                  </tbody>
                                              )
                                          })}
                                  </table>
                              </div>
    
    
    
                          </div>
                      )}
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