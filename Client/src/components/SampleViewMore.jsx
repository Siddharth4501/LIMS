// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// const SampleViewMore = () => {
//   const { state } = useLocation();
//   const [checkedTests, setCheckedTests] = useState([]);
//   const [rowData, setRowData] = useState(
//     state.Tests.map(() => ({
//       Analyst: '',
//       Method: '',
//       Unit: '',
//     }))
//   );
//   const [testType, setTestType] = useState('');
//   // Handler to print row data
//   const [saveData, setSaveData] = useState([]);
//   const handlePrintRow = (item, index) => {
//     const data = { ...item, ...rowData[index] };
//     console.log('Row Data:', data);
//     // alert(`Row Data: ${JSON.stringify(data)}`);
//     setSaveData(prevSaveData => [...prevSaveData, data]);
//   };
//   console.log("saveData",saveData)
//   // Handler to toggle "Select All"
//   const checkkro=state.Tests.filter((item) => item.Type_Of_Testing === testType).length;
//   console.log("checkkro",checkedTests)
//   const handleSelectAll = () => {
//     if (checkedTests.length == state.Tests.filter((item) => item.Type_Of_Testing === testType).length) {
//       setCheckedTests([]); // Deselect all
//       setSaveData([]);
//       console.log("checkedTests", checkedTests)
//     } else {
//       setCheckedTests(state.Tests.filter((item) => item.Type_Of_Testing === testType).map((item) => item.Test)); // Select all
//       const allData = state.Tests.filter((item) => item.Type_Of_Testing === testType).map((item, index) => ({ ...item, ...rowData[index] }));
//       setSaveData(allData);
//     }
//   };

//   // Handler to toggle individual checkbox
//   const handleTestToggle = (testName,item1,index) => {
//     if (checkedTests.includes(testName)) {
//       const data = { ...item1, ...rowData[index] };
//       setSaveData(prevSaveData =>
//         prevSaveData.filter(item => JSON.stringify(item) !== JSON.stringify(data))); //to compare 
//       setCheckedTests(checkedTests.filter((test) => test !== testName));
//     } else {
//       const data = { ...item1, ...rowData[index] };
//       setSaveData(prevSaveData => [...prevSaveData, data]);
//       setCheckedTests([...checkedTests, testName]);
//     }
//   };
  
  
//   // Update row data
//   const updateRowData = (index, field, value) => {
//     const updatedRowData = [...rowData];
//     updatedRowData[index][field] = value;
//     setRowData(updatedRowData);
//   };
//   useEffect(() => {
//     console.log("testtype", testType)
//   }, [testType])


//   const [sections, setSections] = useState([
//     { id: 0, testType: '' },
//   ]);
//   const handleAddSection = () => {
//     const newSection = { id: sections.length, testType: '' };
//     setSections([...sections, newSection]);
//   };

//   return (
//     <div>
      
//     <div className='mt-3 mb-2 ml-2 border border-md border-gray-300 bg-slate-300 p-2 w-1/2 rounded-md'><b>Due Date:</b> {state.Date.split('T')[0]}</div>
//     {sections.map((section) => (
//       <div className="w-full p-4 bg-gray-50">
//         <div className="border border-gray-300 rounded-lg shadow-sm bg-white">

//           {
//             testType === '' ? <div className="flex items-center p-4 border-b">
//               <select name="Type Of Testing" id="Type Of Testing"
//                 className="w-1/4 p-2 bg-slate-100 border border-gray-300 rounded-lg text-gray-700"
//                 onChange={(e) => setTestType(e.target.value)} >
//                 <option value="Type Of Testing">Type Of Testing</option>
//                 {state.Type_Of_Testing.map((item) => (
//                   <option key={item} value={item} >
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div> : <div>
//               <input type="checkbox" className="mr-3 h-5 w-5 text-blue-600" onChange={handleSelectAll} checked={checkedTests.length=== state.Tests.filter((item) => item.Type_Of_Testing === testType).length}/> 
//               {/* To Select/Deselect checkbox we used an attribute 'checked' in which we put logic to get true when all subbox related to it are true....*/}
//               {testType}
//             </div>
//           }


//           {/* Tests Section */}
//           <div className="p-4">
//             {state.Tests.filter((item) => item.Type_Of_Testing === testType).map((item, index) => (
//               <div key={index}
//                 className="grid grid-cols-6 gap-4 mb-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-100" >
//                 {console.log("item", item)}
//                 <div className="font-bold rounded-md p-2">
//                   {index + 1}
//                 </div>
//                 <div className="flex items-center border-l-2 pl-2">
//                   <input type="checkbox"
//                     className="mr-2 h-5 w-5 text-blue-600"
//                     checked={checkedTests.includes(item.Test)}
//                     onChange={() => handleTestToggle(item.Test,item,index)}
//                     // onClick={() => handlePrintRow(item, index)}
//                   />
//                   <span>{item.Test}</span>
//                 </div>
//                 <div>
//                   <select className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full" onChange={(e) =>
//                     updateRowData(index, 'Analyst', e.target.value)}>
//                     <option value="Analyst">Analyst</option>
//                     <option value="Analyst1">Analyst1</option>
//                     <option value="Analyst2">Analyst2</option>
//                     <option value="Analyst3">Analyst3</option>
//                     <option value="Analyst4">Analyst4</option>
//                   </select>
//                 </div>
//                 <div>
//                   <select className="bg-white p-2 border border-gray-300 border-l-2 rounded-lg text-gray-700 w-full" onChange={(e) =>
//                     updateRowData(index, 'Method', e.target.value)
//                   }>
//                     <option value="Method">Method</option>
//                     <option value="Method1">Method1</option>
//                     <option value="Method2">Method2</option>
//                     <option value="Method3">Method3</option>
//                     <option value="Method4">Method4</option>
//                   </select>
//                 </div>
//                 <div>
//                   <select className="bg-white p-2 border border-gray-300 border-l-2 rounded-lg text-gray-700 w-full" onChange={(e) => updateRowData(index, 'Unit', e.target.value)}>
//                     <option value="Unit">Unit</option>
//                     <option value="Unit1">Unit1</option>
//                     <option value="Unit2">Unit2</option>
//                     <option value="Unit3">Unit3</option>
//                     <option value="Unit4">Unit4</option>
//                   </select>
//                 </div>
//                 <div className="text-center font-semibold text-gray-700">
//                   Result: 0
//                 </div>

//                 {/* <div>
//                   <button
//                     onClick={() => handlePrintRow(item, index)}
//                     className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                   >
//                     Print
//                   </button>
//                 </div> */}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className='w-full'><button type="button" className='bg-indigo-700 px-4 py-1 rounded-md text-white hover:bg-indigo-900 float-right mr-2 mt-1' onClick={handleAddSection}>Add More</button></div>
//       </div>
//     ))}
//     </div >
//   )
// }

// export default SampleViewMore


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const SampleViewMore = () => {
  const { state } = useLocation();
  const [checkedTests, setCheckedTests] = useState([]);
  const [rowData, setRowData] = useState(
    state.Tests.map(() => ({
      Analyst: '',
      Method: '',
      Unit: '',
    }))
  );

  useEffect(()=>{
    setRowData(state.Tests.map(() => ({
      Analyst: 'Analyst',
      Method: 'Method',
      Unit: 'Unit',
    })))
  },[])
  const [saveData, setSaveData] = useState([]);
  const [sections, setSections] = useState([{ id: 0, testType: '' }]);
  const [selectedTestTypes, setSelectedTestTypes] = useState([]);
  console.log(saveData,"sA");
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
      ).map((item, index) => ({ ...item, ...rowData[index] }));
      setSaveData((prevSaveData) => [...prevSaveData, ...allData]);
    }
  };

  // Handler for individual test toggle
  const handleTestToggle = (testName, item, index) => {
    if (checkedTests.includes(testName)) {
      setSaveData((prevSaveData) =>
        prevSaveData.filter((data) => data.Test !== testName)
      );
      setCheckedTests(checkedTests.filter((test) => test !== testName));
    } else {
      const data = { ...item, ...rowData[index] };
      setSaveData((prevSaveData) => [...prevSaveData, data]);
      setCheckedTests([...checkedTests, testName]);
    }
  };

  // Update row data for tests
  const updateRowData = (index, field, value) => {
    const updatedRowData = [...rowData];
    updatedRowData[index][field] = value;
    setRowData(updatedRowData);
  };

  const handleSubmit=()=>{
    
    if (checkedTests.length===state.Tests.length) {
      toast.success("data submitted successfully")
    }
    else{
      toast.error("something went wrong");
    }
  }
  

  return (
    <div>
      <div className="mt-3 mb-2 ml-2 border border-md border-gray-300 bg-slate-300 p-2 w-1/2 rounded-md">
        <b>Due Date:</b> {state.Date.split('T')[0]}
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

            {/* Tests Section */}
            <div className={`p-4 ${state.Tests.filter((item) => item.Type_Of_Testing === section.testType).length>2
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
                      onChange={() => handleTestToggle(item.Test, item, index)}
                    />
                    <span>{item.Test}</span>
                  </div>
                  <div>
                    <select
                      className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full"
                      onChange={(e) =>
                        updateRowData(index, 'Analyst', e.target.value)
                      }
                      disabled={checkedTests.includes(item.Test)} 
                    >
                      <option value="Analyst" >Analyst</option>
                      <option value="Analyst1">Analyst1</option>
                      <option value="Analyst2">Analyst2</option>
                      <option value="Analyst3">Analyst3</option>
                      <option value="Analyst4">Analyst4</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full"
                      onChange={(e) =>
                        updateRowData(index, 'Method', e.target.value)
                      }
                      disabled={checkedTests.includes(item.Test)}
                    >
                      <option value="Method">Method</option>
                      <option value="Method1">Method1</option>
                      <option value="Method2">Method2</option>
                      <option value="Method3">Method3</option>
                      <option value="Method4">Method4</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full"
                      onChange={(e) =>
                        updateRowData(index, 'Unit', e.target.value)
                      }
                      disabled={checkedTests.includes(item.Test)}
                    >
                      <option value="Unit">Unit</option>
                      <option value="Unit1">Unit1</option>
                      <option value="Unit2">Unit2</option>
                      <option value="Unit3">Unit3</option>
                      <option value="Unit4">Unit4</option>
                    </select>
                  </div>
                  <div className="text-center font-semibold text-gray-700">
                    Result: 0
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
        ): <span className='w-0'></span>

      }
    </div>
  );
};

export default SampleViewMore;


