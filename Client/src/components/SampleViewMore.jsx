import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendTMData } from '../Redux/Slices/SampleSlice';
import { useDispatch } from 'react-redux';

const SampleViewMore = () => {
  const { state } = useLocation();
  const dispatch=useDispatch();
  const [checkedTests, setCheckedTests] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [dueDate,setDueDate]=useState();
  const handleDueDate=(e)=>{
    setDueDate(e.target.value);
  }
  useEffect(() => {
    const initialRowData = {};
    state.Type_Of_Testing.forEach((testType) => {
      initialRowData[testType] = state.Tests
        .filter((test) => test.Type_Of_Testing === testType)
        .map((test) => ({ Test:test.Test,Analyst: '', Method: '', Unit: '' }));
    });
    setRowData(initialRowData);
  }, [state.Tests, state.Type_Of_Testing]);

  const [saveData, setSaveData] = useState([]);
  const [sections, setSections] = useState([{ id: 0, testType: '' }]);
  const [selectedTestTypes, setSelectedTestTypes] = useState([]);
  console.log(saveData, "sA");
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

  // Handler for "Select All" toggle
  const handleSelectAll = (testType) => {
    const relatedTests = state.Tests.filter(
      (item) => item.Type_Of_Testing === testType
    ).map((item) => item.Test);

    if (relatedTests.every((test) => checkedTests.includes(test))) {
      setCheckedTests(checkedTests.filter((test) => !relatedTests.includes(test)));
      setSaveData((prevSaveData) =>
        prevSaveData.filter(
          (data) => !relatedTests.some((test) => data.Test === test)
        )
      );
    } else {
      setCheckedTests([...checkedTests, ...relatedTests]);
      const allData = state.Tests.filter(
        (item) => item.Type_Of_Testing === testType
      ).map((item, index) => ({ ...item, ...rowData[testType][index] }));
      setSaveData((prevSaveData) => [...prevSaveData, ...allData]);
    }
  };

  // Handler for individual test toggle
  const handleTestToggle = (testName, item,testType,index) => {
    if (checkedTests.includes(testName)) {
      setSaveData((prevSaveData) =>
        prevSaveData.filter((data) => data.Test !== testName)
      );
      setCheckedTests(checkedTests.filter((test) => test !== testName));
    } else {
      const data = { ...item, ...rowData[testType][index] };
      setSaveData((prevSaveData) => [...prevSaveData, data]);
      setCheckedTests([...checkedTests, testName]);
    }
  };

  // Updates row data for tests
  const updateRowData = (testType,index, field, value) => {
    console.log(testType,index,field,value,"svg",rowData);
    const updatedRowData = {...rowData};
    updatedRowData[testType][index][field] = value;
    setRowData(updatedRowData);
  };
  

const [applyToAllAnalyst, setApplyToAllAnalyst] = useState(''); // Track Analyst for "Apply to All"
const [applyToAllMethod,setApplyToAllMethod]=useState('')//Track Method for apply to All
const [applyToAllUnit,setApplyToAllUnit]=useState('')////Track Unit for apply to All

const handleApplyToAllAnalyst = (analystValue,testType) => {
  // Updates all rows with the selected Analyst value
  const updatedRowData={ ...rowData }
  updatedRowData[testType] = rowData[testType].map((row) => ({
    ...row,
    Analyst: analystValue,
  }));
  setRowData(updatedRowData);
  setApplyToAllAnalyst(analystValue);
}

const handleApplyToAllMethod = (methodValue,testType) => {
  // Updates all rows with the selected Analyst value
  const updatedRowData={ ...rowData }
  updatedRowData[testType] = rowData[testType].map((row) => ({
    ...row,
    Method: methodValue,
  }));
  setRowData(updatedRowData);
  setApplyToAllMethod(methodValue);
};

const handleApplyToAllUnit = (unitValue,testType) => {
  // Update all rows with the selected Analyst value
  const updatedRowData={ ...rowData }
  updatedRowData[testType] = rowData[testType].map((row) => ({
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

  if (checkedTests.length === state.Tests.length && dueDate  && state._id){
    const allotmentData={
      "TM_Data":rowData,
      "Due_Date":dueDate,
      "Sample_Id":state._id,
      "TM_Status":"Pending At Analyst"
    }
    console.log("allotmentData",allotmentData);
    const res=await dispatch(sendTMData(allotmentData));
    if(res?.payload?.success){
      //here in res?.payload?.success ,the success parameter comes from res.json at backend
      toast.success("data submitted successfully")
    }
  }
  else {
    toast.error("Please fill all the fields");
  }
}

  return (
    <div>
      <div className="mt-3 mb-2 ml-2 border border-md border-gray-300 bg-slate-300 p-2 w-1/2 rounded-md">
        <b>Due Date:</b> <input type="date" name="" id="" onChange={(e)=>handleDueDate(e)} />
      </div>
      {sections.map((section) => (
        <div key={section.id} className="w-full p-4 bg-gray-100 mb-12">
          <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
            {section.testType === '' ? (
              <div className="flex items-center p-4 border-b">
                <select
                  name="Type Of Testing"
                  id="Type Of Testing"
                  className="w-1/4 p-2 bg-slate-100 border border-gray-300 rounded-lg text-gray-700"
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
              <div>
                <input
                  type="checkbox"
                  className="mt-4 mr-2 ml-4 h-5 w-5 text-blue-600"
                  onChange={() => handleSelectAll(section.testType)}
                  checked={
                    state.Tests.filter(
                      (item) => item.Type_Of_Testing === section.testType
                    ).every((test) => checkedTests.includes(test.Test))
                  }
                />
                <span className='font-semibold text-lg'>{section.testType}</span>
              </div>
            )}




            <div className={`p-4 ${state.Tests.filter((item) => item.Type_Of_Testing === section.testType).length > 2
              ? "max-h-64 overflow-y-auto"
              : ""
              }`}>
              {state.Tests.filter(
                (item) => item.Type_Of_Testing === section.testType
              ).map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-4 mb-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-100"
                >
                  <div className="font-bold rounded-md p-2">{index + 1}</div>
                  <div className="flex items-center border-l-2 pl-2">
                    <input
                      type="checkbox"
                      className="mr-2 h-5 w-5 text-blue-600"
                      checked={checkedTests.includes(item.Test)}
                      onChange={() => handleTestToggle(item.Test, item,section.testType, index)}
                    />
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
                        updateRowData(section.testType,index, 'Analyst', e.target.value);
                        setApplyToAllAnalyst(e.target.value); // Track the value for "Apply to All"
                      }}
                      disabled={checkedTests.includes(item.Test)}
                      value={rowData[section.testType][index]?.Analyst || ''}
                    >
                      <option value="Analyst">Analyst</option>
                      <option value="Analyst1">Analyst1</option>
                      <option value="Analyst2">Analyst2</option>
                      <option value="Analyst3">Analyst3</option>
                      <option value="Analyst4">Analyst4</option>
                    </select>
                  </div>

                  <div>
                    <button
                      className="bg-sky-600 text-white p-2 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
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
                      disabled={checkedTests.includes(item.Test)}
                      value={rowData[section.testType][index]?.Method || ''}
                    >
                      <option value="Method">Method</option>
                      <option value="Method1">Method1</option>
                      <option value="Method2">Method2</option>
                      <option value="Method3">Method3</option>
                      <option value="Method4">Method4</option>
                    </select>
                  </div>
                  <div>
                    <button
                      className="bg-sky-600 text-white p-2 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
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
                      disabled={checkedTests.includes(item.Test)}
                      value={rowData[section.testType][index]?.Unit || ''}
                    >
                      <option value="Unit">Unit</option>
                      <option value="Unit1">Unit1</option>
                      <option value="Unit2">Unit2</option>
                      <option value="Unit3">Unit3</option>
                      <option value="Unit4">Unit4</option>
                    </select>
                  </div>
                  <div className="text-center font-semibold text-gray-700 pt-8">
                    Result:0
                  </div>
                </div>
              ))}
            </div>

          </div>
          {
            selectedTestTypes.length === state.Type_Of_Testing.length ? <span className=''></span> : (
              <div className="w-full">
                <button
                  type="button"
                  className="bg-indigo-700 px-4 py-1 rounded-md text-white hover:bg-indigo-900 float-right mr-2 mt-6"
                  onClick={handleAddSection}
                >
                  Add More
                </button>
              </div>
            )
          }

        </div>
      ))}
      {
        selectedTestTypes.length === state.Type_Of_Testing.length ? (
          <div className='w-full mb-20'><button type="button" className='bg-indigo-700 px-10 py-1 text-lg font-semibold rounded-md text-white float-center flex justify-center mx-auto w-1/4 hover:bg-indigo-900' onClick={handleSubmit}>Submit</button></div>
        ) : <span className='w-0'></span>

      }
    </div>
  );
};

export default SampleViewMore;
