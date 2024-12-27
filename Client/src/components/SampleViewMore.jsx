import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

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

  // Handler to print row data
  const handlePrintRow = (item, index) => {
    const data = { ...item, ...rowData[index] };
    console.log('Row Data:', data);
    alert(`Row Data: ${JSON.stringify(data)}`);
  };
  // // Handler to print row data
  // const handlePrintRow = (item) => {
  //   console.log('Row Data:', item);
  //   alert(`Row Data: ${JSON.stringify(item)}`);
  // };

  // Handler to toggle "Select All"
  const handleSelectAll = () => {
    if (checkedTests.length === state.Tests.length) {
      setCheckedTests([]); // Deselect all
      console.log("checkedTests", checkedTests)
    } else {
      setCheckedTests(state.Tests.map((item) => item.Test)); // Select all
    }
  };

  // Handler to toggle individual checkbox
  const handleTestToggle = (testName) => {
    if (checkedTests.includes(testName)) {
      setCheckedTests(checkedTests.filter((test) => test !== testName));
    } else {
      setCheckedTests([...checkedTests, testName]);
    }
  };
   // Update row data
   const updateRowData = (index, field, value) => {
    const updatedRowData = [...rowData];
    updatedRowData[index][field] = value;
    setRowData(updatedRowData);
  };
  return (
    <div>
      {/* {state.Name} */}
      <div className='mt-3 mb-2 ml-2 border border-md border-gray-300 bg-slate-300 p-2 w-1/2 rounded-md'><b>Due Date:</b> {state.Date.split('T')[0]}</div>

      <div className="w-full p-4 bg-gray-50">
        <div className="border border-gray-300 rounded-lg shadow-sm bg-white">

          <div className="flex items-center p-4 border-b">
            <input type="checkbox" className="mr-3 h-5 w-5 text-blue-600" onChange={handleSelectAll} />
            <select name="Type Of Testing" id="Type Of Testing"
              className="w-1/4 p-2 bg-slate-100 border border-gray-300 rounded-lg text-gray-700" >
              <option value="Type Of Testing">Type Of Testing</option>
              {state.Type_Of_Testing.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Tests Section */}
          <div className="p-4">
            {state.Tests.map((item, index) => (
              <div key={index}
                className="grid grid-cols-6 gap-4 mb-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-100" >
                <div className="font-bold rounded-md p-2">
                  {index + 1}
                </div>
                <div className="flex items-center border-l-2 pl-2">
                  <input type="checkbox"
                    className="mr-2 h-5 w-5 text-blue-600"
                    checked={checkedTests.includes(item.Test)}
                    onChange={() => handleTestToggle(item.Test)}
                  />
                  <span>{item.Test}</span>
                </div>
                <div>
                  <select className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full" onChange={(e) =>
                      updateRowData(index, 'Analyst', e.target.value)}>
                    <option value="Analyst">Analyst</option>
                    <option value="Analyst1">Analyst1</option>
                    <option value="Analyst2">Analyst2</option>
                    <option value="Analyst3">Analyst3</option>
                    <option value="Analyst4">Analyst4</option>
                  </select>
                </div>
                <div>
                  <select className="bg-white p-2 border border-gray-300 border-l-2 rounded-lg text-gray-700 w-full" onChange={(e) =>
                      updateRowData(index, 'Method', e.target.value)
                    }>
                    <option value="Method">Method</option>
                    <option value="Method1">Method1</option>
                    <option value="Method2">Method2</option>
                    <option value="Method3">Method3</option>
                    <option value="Method4">Method4</option>
                  </select>
                </div>
                <div>
                  <select className="bg-white p-2 border border-gray-300 border-l-2 rounded-lg text-gray-700 w-full" onChange={(e) => updateRowData(index, 'Unit', e.target.value)}>
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
                {/* Print Button */}
                <div>
                  <button
                    onClick={() => handlePrintRow(item, index)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Print
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>


    </div >
  )
}

export default SampleViewMore




// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const SampleViewMore = () => {
//   const { state } = useLocation();
//   const [checkedTests, setCheckedTests] = useState([]);

//   // Handler to toggle "Select All"
//   const handleSelectAll = () => {
//     if (checkedTests.length === state.Tests.length) {
//       setCheckedTests([]); // Deselect all
//     } else {
//       setCheckedTests(state.Tests.map((item) => item.Test)); // Select all
//     }
//   };

//   // Handler to toggle individual checkbox
//   const handleTestToggle = (testName) => {
//     if (checkedTests.includes(testName)) {
//       setCheckedTests(checkedTests.filter((test) => test !== testName));
//     } else {
//       setCheckedTests([...checkedTests, testName]);
//     }
//   };

//   return (
//     <div>
//       <div className="mt-3 mb-2 ml-2 border border-md border-gray-300 bg-slate-300 p-2 w-1/2 rounded-md">
//         <b>Due Date:</b> {state.Date.split('T')[0]}
//       </div>

//       <div className="w-full p-4 bg-gray-50">
//         <div className="border border-gray-300 rounded-lg shadow-sm bg-white">

//           {/* Select All Checkbox */}
//           <div className="flex items-center p-4 border-b">
//             <input
//               type="checkbox"
//               className="mr-3 h-5 w-5 text-blue-600"
//               checked={checkedTests.length === state.Tests.length}
//               onChange={handleSelectAll}
//             />
//             <label className="text-gray-700 font-semibold">Select All Tests</label>
//           </div>

//           {/* Tests Section */}
//           <div className="p-4">
//             {state.Tests.map((item, index) => (
//               <div
//                 key={index}
//                 className="grid grid-cols-6 gap-4 mb-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-100"
//               >
//                 <div className="font-bold rounded-md p-2">{index + 1}</div>
//                 <div className="flex items-center border-l-2 pl-2">
//                   <input
//                     type="checkbox"
//                     className="mr-2 h-5 w-5 text-blue-600"
//                     checked={checkedTests.includes(item.Test)}
//                     onChange={() => handleTestToggle(item.Test)}
//                   />
//                   <span>{item.Test}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SampleViewMore;
