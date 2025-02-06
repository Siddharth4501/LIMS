import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendTMData } from '../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserData } from '../Redux/Slices/AuthSlice';
import { updateSample } from '../Redux/Slices/SampleSlice';
import { getSubstanceData } from '../Redux/Slices/SubstanceSlice';

const SampleViewMore = () => {
  const { state } = useLocation();
  const { substanceData } = useSelector((state) => state.substance);
    const [allSubstanceDataState, setAllSubstanceDataState] = useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [rowData, setRowData] = useState([]);
  const [dueDate,setDueDate]=useState();
  const [allUserDataState,setAllUserDataState]=useState([]);

  const {allUserData}=useSelector((state)=>state.auth)
  useEffect(() => {
    (async () => {
      await dispatch(getAllUserData());
    })();
  }, []);
  useEffect(() => {
    setAllUserDataState(allUserData);
  },[allUserData])
  useEffect(() => {
    (async () => {
      await dispatch(getSubstanceData());
    })();
  }, []);
  useEffect(() => {
    setAllSubstanceDataState(substanceData);
  }, [substanceData])
  console.log(allUserData,"jkl",state.Group)
  const handleDueDate=(e)=>{
    setDueDate(e.target.value);
  }
  
  useEffect(() => {
    const initialRowData = {};
    state.Type_Of_Testing.forEach((testType) => {
      initialRowData[testType] = {Tests: [] };
      initialRowData[testType].Tests = state.Tests
        .filter((test) => test.Type_Of_Testing === testType)
        .map((test) => ({ Test:{"Test_Name":test.Test,"TestID":test._id},Analyst: {"Name":'',"ID":''}, Method: '', Unit: '',Result:'',Start_Date:'',End_Date:'',NABL:false }));
    });//make Test as an obj whith unique id
    setRowData(initialRowData);
  }, [state.Tests, state.Type_Of_Testing]);
  console.log(rowData,"ddef")

  const [sections, setSections] = useState([{ id: 0, testType: '' }]);
  const [selectedTestTypes, setSelectedTestTypes] = useState([]);
  // Handler to add new sections
  const handleAddSection = () => {
    const newSection = { id: sections.length, testType: '' };
    setSections([...sections, newSection]);
  };

  // Update selected test types for a section
  const updateTestType = (id, value) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, testType: value } : section
    );

    const updatedSelectedTestTypes = [...selectedTestTypes];
    const currentSection = sections.find((section) => section.id === id);

    if (currentSection?.testType) {
      // Remove the previously selected test type
      const index = updatedSelectedTestTypes.indexOf(currentSection.testType);
      if (index > -1) {
        updatedSelectedTestTypes.splice(index, 1);
      }
    }

    if (value !== '') {
      updatedSelectedTestTypes.push(value);
    }

    setSections(updatedSections);
    setSelectedTestTypes(updatedSelectedTestTypes);
  };

  // Updates row data for tests
  const updateRowData = (testType,index, field, value,ID) => {
    if(ID){
      console.log(testType,index,field,value,"svg",rowData,ID);
      const updatedRowData = {...rowData};
      const obj={
        "Name":value,
        "ID":ID
      }
      updatedRowData[testType].Tests[index][field] = obj;
      setRowData(updatedRowData);
    }
    else{

      console.log(testType,index,field,value,"svg1",rowData);
      const updatedRowData = {...rowData};
      updatedRowData[testType].Tests[index][field] = value;
      setRowData(updatedRowData);
    }
  };
  

const [applyToAllAnalyst, setApplyToAllAnalyst] = useState({
  "Name":'',
  "ID":''
}); // Track Analyst for "Apply to All"
const [applyToAllMethod,setApplyToAllMethod]=useState('')//Track Method for apply to All
const [applyToAllUnit,setApplyToAllUnit]=useState('')////Track Unit for apply to All

const handleApplyToAllAnalyst = (analyst,testType) => {
  // Updates all rows with the selected Analyst value
  const updatedRowData={ ...rowData }
  updatedRowData[testType].Tests = rowData[testType].Tests.map((row) => ({
    ...row,
    Analyst:{
      ...row.Analyst,
      Name:analyst.Name,
      ID:analyst.ID
    }
  }));
  setRowData(updatedRowData);
  setApplyToAllAnalyst(analyst);
}

const handleApplyToAllMethod = (methodValue,testType) => {
  // Updates all rows with the selected Analyst value
  const updatedRowData={ ...rowData }
  updatedRowData[testType].Tests = rowData[testType].Tests.map((row) => ({
    ...row,
    Method: methodValue,
  }));
  setRowData(updatedRowData);
  setApplyToAllMethod(methodValue);
};

const handleApplyToAllUnit = (unitValue,testType) => {
  // Update all rows with the selected Analyst value
  const updatedRowData={ ...rowData }
  updatedRowData[testType].Tests = rowData[testType].Tests.map((row) => ({
    ...row,
    Unit: unitValue,
  }));
  setRowData(updatedRowData);
  setApplyToAllUnit(unitValue);
};


//To Update the "Apply to All" checkbox handling
const handleApplyToAllAnalystBtn = (isChecked,testType) => {
  
  if (isChecked && applyToAllAnalyst) {  
    handleApplyToAllAnalyst(applyToAllAnalyst,testType);
  }
};
const handleApplyToAllMethodBtn = (isChecked,testType) => {
  if (isChecked && applyToAllMethod) {  
    handleApplyToAllMethod(applyToAllMethod,testType);
  }
}
const handleApplyToAllUnitBtn = (isChecked,testType) => {
  if (isChecked && applyToAllUnit) {  
    handleApplyToAllUnit(applyToAllUnit,testType);
  }
}
const handleSubmit = async() => {
  if(!dueDate){
    toast.error("Due Date is Required");
    return;
  }
  let flag = false;

  const keys = Object.keys(rowData); // Get all keys from rowData

  for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
    const key = keys[keyIndex]; // Get the current key
    const tests = rowData[key].Tests; // Get the Tests array

    for (let testIndex = 0; testIndex < tests.length; testIndex++) {
      const test = tests[testIndex]; // Get the current test

      if (test.Method === '') {
        toast.error(`Method is required at Type Of Testing: ${key}, Test: ${test.Test.Test_Name}, Index: ${testIndex+1}`);
        flag = true;
        break;
      }
      if (test.Unit === '') {
        toast.error(`Unit is required at Type Of Testing: ${key}, Test: ${key}, Index: ${testIndex+1}`);
        flag = true;
        break;
      }
      if (test.Analyst.Name === '' || test.Analyst.ID === '' ) {
        toast.error(`Analyst is required at Type Of Testing: ${key}, Test: ${test.Test.Test_Name}, Index: ${testIndex+1}`);
        flag = true;
        break;
      }
    }

    if (flag) break; // Stop execution if an error is found
  }

  if (flag) return; // Prevent further execution

  const allotmentData={
    "TM_Data":rowData,
    "Due_Date":dueDate,
    "Sample_Id":state._id,
    "TM_Status":"Pending At Analyst",
  }
  console.log("allotmentData",allotmentData);
  const res=await dispatch(sendTMData(allotmentData));
  if(res?.payload?.success){
    const ID=state._id
    const obj={
      "ID":ID,
      "Status":"Pending At Analyst"
    };
    const response=await dispatch(updateSample(obj))
    if(response?.payload?.success){
      //here in res?.payload?.success ,the success parameter comes from res.json at backend
      toast.success("data submitted successfully")
      navigate('/SampleAllotment')
    }
  }
  else {
    toast.error("Please fill all the fields");
  }
}
console.log("dhoku",rowData);
  return (
    <div>
      <div className="mt-3 mb-2 border-2 border-md border-blue-600 bg-zinc-100 py-2 px-4 w-3/5 mx-auto rounded-md">
        <div className='flex justify-center gap-2'><b className='text-lg'>Due Date:</b> <input type="date" name="DueDate" id="DueDate" min={state.Date.split('T')[0]} onChange={(e)=>handleDueDate(e)} className='px-4 border-2 border-blue-600'/></div>
      </div>
      <br />
      <div className='w-full'>
        {sections.map((section) => (
          <div key={section.id} className='w-full'>
            <div  className="w-full p-4 bg-gray-200 mb-12">
              <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
                {section.testType === '' ? (
                  <div className="flex items-center p-4 border-b">
                    <select
                      name="Type Of Testing"
                      id="Type Of Testing"
                      className="w-1/4 p-2 border-2 border-blue-600 rounded-lg text-gray-700 font-semibold"
                      value={section.testType}
                      onChange={(e) => updateTestType(section.id, e.target.value)}
                    >
                      <option value="">Type Of Testing</option>
                      {state.Type_Of_Testing.filter(
                        (item) => !selectedTestTypes.includes(item)
                      ).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className='pl-5 pt-2'>
                    <span className='font-semibold text-lg'>{section.testType}</span>
                  </div>
                )}

                <div className={`p-4 ${state.Tests.filter((item) => item.Type_Of_Testing === section.testType).length > 2
                  ? "max-h-[500px] overflow-y-auto"
                  : ""
                  }`}>
                  {state.Tests.filter(
                    (item) => item.Type_Of_Testing === section.testType
                  ).map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-4 mb-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-100"
                    >
                      <div className="font-bold rounded-md p-2">{index + 1}</div>
                      <div className="flex items-center border-l-2 pl-2">
                        <span>{item.Test}</span>
                      </div>
                      <div>
                        <button
                          className="bg-sky-600 text-white p-2 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
                          onClick={() => handleApplyToAllAnalystBtn(true,section.testType)}
                        >
                          Apply to All
                        </button>
                        <select
                          className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full mt-2"
                          onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            const selectedId = selectedOption.id;
                            {console.log(selectedId,"igh")}
                            updateRowData(section.testType,index, 'Analyst', e.target.value,selectedId);
                            setApplyToAllAnalyst(()=>({
                              "Name":e.target.value,
                              "ID":selectedOption.id
                            })); // Track the value for "Apply to All"
                          }}
                          value={rowData[section.testType].Tests[index]?.Analyst?.Name || ''}
                        >
                          <option value="" id=''>Analyst</option>
                          {
                            allUserDataState
                            ?.filter((element)=>element.Active_Status===true)
                            ?.filter((user) =>
                              user.roles?.some(
                                (item) => item?.designation === "Analyst" && item?.Assigned_Group.includes(state.Group)
                              )
                            )
                            .map((data) => {
                              return <option key={data._id} id={data._id} value={data.fullName}>{data.fullName}</option>;
                            })
                          
                          }
                        </select>
                      </div>

                      <div>
                        <button
                          className="bg-sky-600 text-white p-2 mb-1 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
                          onClick={() => handleApplyToAllMethodBtn(true,section.testType)}
                        >
                          Apply to All
                        </button>
                        <select
                          className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full"
                          onChange={(e) => {
                            updateRowData(section.testType,index, 'Method', e.target.value);
                            setApplyToAllMethod(e.target.value)
                          }}
                          value={rowData[section.testType].Tests[index]?.Method || ''}
                        >
                          <option value="">Method</option>
                          {
                            allSubstanceDataState
                              ?.map((substance) => {
                                // Find the substance where TestID matches item._id
                                
                                if (substance.Test.Test_Name !== item.Test) return null;  
                                return substance?.MethodUnitList?.map((ele,ele_idx) => (
                                  <option key={`${ele.Method}-${ele_idx}`} value={ele.Method}>
                                    {ele.Method}
                                  </option>
                                ));
                              })
                          }
                        </select>
                      </div>
                      <div>
                        <button
                          className="bg-sky-600 text-white p-2 mb-1 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
                          onClick={() => handleApplyToAllUnitBtn(true,section.testType)}
                        >
                          Apply to All
                        </button>
                        <select
                          className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full"
                          onChange={(e) => {
                            updateRowData(section.testType,index, 'Unit', e.target.value)
                            setApplyToAllUnit(e.target.value)
                          }}
                          value={rowData[section.testType].Tests[index]?.Unit || ''}
                        >
                          <option value="">Unit</option>
                          {
                            allSubstanceDataState
                              ?.map((substance) => {
                                // Find the substance where TestID matches item._id
                                if (substance.Test.Test_Name !== item.Test) return null;
                                return substance?.MethodUnitList?.map((ele,ele_idx) => (
                                  <option key={`${ele.Unit}-${ele_idx}`} value={ele.Unit}>
                                    {ele.Unit}
                                  </option>
                                ));
                              })
                          }    
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              

            </div>
          </div>
        ))}
        {
          sections.length === state.Type_Of_Testing.length ? <span className=''></span> : (
            <div className='w-full'>
              <div className="w-full">
                <button
                  type="button"
                  className="bg-indigo-700 px-4 py-1 rounded-md text-white hover:bg-indigo-900 float-right mr-2"
                  onClick={handleAddSection}
                >
                  Add More
                </button>
              </div>
              <br /><br /><br /><br />
            </div>
            
          )
        }
      </div>
      {
        selectedTestTypes.length === state.Type_Of_Testing.length ? (
          <div className='w-full mb-20'><button type="button" className='bg-indigo-700 px-10 py-1 text-lg font-semibold rounded-md text-white float-center flex justify-center mx-auto w-1/4 hover:bg-indigo-900' onClick={handleSubmit}>Submit</button></div>
        ) : <span className='w-0'></span>

      }
    </div>
  );
};

export default SampleViewMore;
