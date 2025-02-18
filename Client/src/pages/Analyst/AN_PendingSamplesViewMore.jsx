import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { updateSample, updateTMANData } from '../../Redux/Slices/SampleSlice';
import toast from 'react-hot-toast';
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import UserCommonNav from '../../components/UserCommonNav';

const AN_PendingSamplesViewMore = () => {
    const {state}=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [csvData,setCsvData]=useState([["ID", "Type Of Testing", "Name","Result"]])
    const userData=JSON.parse(localStorage.getItem("userData"));
    console.log(state,state.TMANID,"hjtyj");
    const [substances,setSubstance]=useState(state.Substances_To_Be_Analysed)
    const [resultColumn, setResultColumn] = useState([]);
    // const [lastUpdated, setLastUpdated] = useState(null);
    console.log(substances,"opin");
    
const handleResultChange = (e, typeOfTesting, testID,Name) => {
    const { value } = e.target;
    console.log(value,"cdp");
    // Update resultColumn for the specific TestID
    setResultColumn((prev) => {
        console.log("siddddk")
        const updatedColumn = [...prev];
        const existingIndex = updatedColumn.findIndex(
        (col) => col.testID === testID
        );
    
        if (existingIndex !== -1) {
        // Update existing entry
        updatedColumn[existingIndex] = {
            ...updatedColumn[existingIndex],
            Result: String(value),
        };
        } else {
        // Add new entry if not found
        updatedColumn.push({
            Name: Name,
            Result: String(value),
        });
        }
        return updatedColumn;
    });
    
    // Update substances for the specific testID
    setSubstance((prevState) => ({
        ...prevState,
        [typeOfTesting]: {
        ...prevState[typeOfTesting],
        Tests: prevState[typeOfTesting].Tests.map((item) =>
            item.Test.TestID === testID
            ? { ...item, Result: String(value) || "" } // Update Result for the matching TestID
            : item
        ),
        },
    }));
    };
    const handleStartDate=(e,typeOfTesting,testID)=>{
        const {value}=e.target;//value of input type 'date is always string
        const dateValue = new Date(value);
        console.log(dateValue,"StartDate")
        setSubstance((prevState)=>({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],
                Tests: prevState[typeOfTesting].Tests.map((item) =>
                    item.Test.TestID === testID ? { ...item, Start_Date: dateValue } : item
                  ),
            }
        }));
    }
    const handleEndDate=(e,typeOfTesting,testID)=>{
        const {value}=e.target;
        const dateValue = new Date(value);
        setSubstance((prevState)=>({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],
                Tests: prevState[typeOfTesting].Tests.map((item) =>
                    item.Test.TestID === testID ? { ...item, End_Date: dateValue } : item
                ),
            }
        }));
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!state.TMANID || !userData._id){
            toast.error("Unexpected error occured,please close the page and try again!!")
        }

        //map is not used becase it is asynchronous and does not terminate immediately
        for (const key of Object.keys(substances)) {
            const filteredItems = substances[key].Tests.filter((data) => data.Analyst.ID === userData._id);
        
            for (const element of filteredItems) {
              if (element.Result === '') {
                toast.error(`Result for Test ${element.Test.Test_Name} is blank`);
                return; // Exit function immediately on error
              }
            if (!(element.Start_Date)){
                toast.error(`Start Date for Test ${element.Test.Test_Name} is blank`)
                return;
            }
            if(!(element.End_Date)){
                toast.error(`End Date for Test ${element.Test.Test_Name} is blank`)
                return;
            }
}
        }
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
            const ID=state.Sample_Alloted;
            const obj={
                "ID":ID,
                "TMANID":state.TMANID,
                "Status":"Pending For Approval At TM"
            };
            const response=await dispatch(updateSample(obj))
            if(response?.payload?.success){
                //here in res?.payload?.success ,the success parameter comes from res.json at backend
                toast.success("result added successfully")
                navigate('/AN_PendingSamples')
            }
            }
        else {
          toast.error("Something Went Wrong");
        }
    }
    useEffect(() => {
        const data = [];
    
        Object.keys(substances).forEach((key) => {
            substances[key].Tests.filter((item) => item.Analyst.ID === userData._id)
                .forEach((element) => {
                    data.push([
                        element.Test.TestID,
                        key,
                        element.Test.Test_Name,
                        element.Result,
                    ]);
                });
        });
    
        setCsvData((prev) => [...prev, ...data]);
    }, []);
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
            testID:row["ID"],
            TypeOfTesting: row["Type Of Testing"],  
            Name: row["Name"],    
            Result: String(row["Result"]),
          }
          extractedData.push(obj);
        }); // Assuming "Result" is the column name
        setResultColumn(extractedData);
        extractedData.map((item)=>{
            setSubstance((prevState) => ({
                ...prevState,
                [item.TypeOfTesting]: {
                ...prevState[item.TypeOfTesting],
                Tests: prevState[item.TypeOfTesting].Tests?.map((data) =>
                    data.Test.TestID === item.testID && data.Analyst.ID === userData._id
                    ? { ...data, Result: item.Result || "" } // Update Result for the matching TestID
                    : data
                ),
                },
            }));
      });
      }
      reader.readAsArrayBuffer(file); // Read the file as a binary array
    }}
  console.log(resultColumn,"yup");
  const handleDateApplyToAll=(TypeOfTesting, TestID)=>{
    let foundItem=substances[TypeOfTesting].Tests.find((test)=>test.Test.TestID===TestID);
    if(!foundItem){
        toast.error("Something Went Wrong,Please Try Again");
        return;
    }
    const StartDate=foundItem.Start_Date;
    const EndDate=foundItem.End_Date;
    if(StartDate && EndDate){
        setSubstance((prevState) => ({
            ...prevState,
            [TypeOfTesting]: {
            ...prevState[TypeOfTesting],
            Tests: prevState[TypeOfTesting].Tests.map((item) =>
                item.Analyst?.ID === userData?._id
                ? { ...item, Start_Date:StartDate,End_Date:EndDate}
                : item
            ),
            },
        }));
    };
    }
  console.log(substances,"hudda")
  return (
      <form onSubmit={handleSubmit}>
        <div>
            <UserCommonNav assignedRole='Analyst'/>
          <div className='w-full p-5'>
            <button type='button' className='float-right bg-indigo-700 px-8 py-1 rounded-md text-white' onClick={()=>navigate('/AN_PendingSamples')}>Back</button>
          </div>
          <br />
          <div className='w-full'>
            <CSVLink data={csvData} className='bg-indigo-700 text-white py-1 px-2 border-indigo-700 m-5 rounded '>Download Data in Excel</CSVLink>
            <input type="file" accept=".xlsx,.xls" name="ExcelFileInput" id="ExcelFileInput" onChange={handleExcelFileUpload} className='float-right bg-gray-100 p-1 border-2 border-gray-600'/>
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
    
                              <div className={
                                      state.Substances_To_Be_Analysed[key].Tests.filter(
                                          (data) => data.Analyst.ID === userData._id
                                      ).length >3
                                          ? 'overflow-y-auto max-h-[500px]'
                                          : ''
                                  }>
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
                                        
                                        substances[key].Tests.filter((data)=>data.Analyst.ID===userData._id).map((item, index) => {
                                            const filteredItem=state.Substances_To_Be_Analysed[key].Tests.filter((data)=>data.Analyst.ID===userData._id);
                                            {console.log(index,resultColumn[index],"liop",filteredItem.length)}
                                              return (
                                                  <tbody key={`${key}-${index}`} >
                                                    <tr className="hover:bg-gray-100">
                                                        <td className="border border-gray-300 px-4 py-2 text-center font-bold">{index + 1}.</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Test.Test_Name}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Method}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Unit}</td>
                                                
                                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                                            <input
                                                                type="text"
                                                                name={`Result-${item.Test.Test_Name}`}
                                                                id={`Result-${item.Test.Test_Name}`}  
                                                                value={
                                                                    resultColumn.find(
                                                                    (col) => col.testID === item.Test.TestID
                                                                )?.Result || item.Result || ""
                                                                
                                                                }
                                                                placeholder='Enter Result Here..'
                                                                onChange={(e) => handleResultChange(e, key, item.Test.TestID,item.Test.Test_Name)}
                                                                className="text-center border-2 border-blue-700 rounded-md w-72 max-w-72 p-1 focus:border-blue-700 outline-0"
                                                            />
                                                        </td>
                                                        
                                                        <td className="border border-gray-300 px-4 py-2 text-center flex flex-col">
                                                            <div className='full'>
                                                                <button type='button' className='px-4 py-1 text-white min-w-32 rounded bg-sky-600 hover:bg-sky-700' onClick={()=>handleDateApplyToAll(key, item.Test.TestID)}>Apply To All</button>
                                                            </div>
                                                            <div>
                                                                <input type="date" name={`Start_Date-${key}`} id={`Start_Date-${key}`} min={state.Date.split('T')[0]} max={state.Due_Date.split('T')[0]} value={item.Start_Date ?item.Start_Date.toISOString().split('T')[0]:''} className='border-2 border-blue-600 p-1 m-2 rounded outline-0' onChange={(e)=>handleStartDate(e,key,item.Test.TestID)}/>-<input type="date" name={`End_Date-${key}`} id={`Start_Date-${key}`} value={item.End_Date ? item.End_Date.toISOString().split('T')[0]: ''} className='border-2 border-blue-600 p-1 mb-2 rounded m-2 outline-0' min={state.Date.split('T')[0]} max={state.Due_Date.split('T')[0]} onChange={(e)=>handleEndDate(e,key,item.Test.TestID)}/>
                                                            </div>
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