import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendTMData } from '../Redux/Slices/SampleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserData } from '../Redux/Slices/AuthSlice';
import { updateSample } from '../Redux/Slices/SampleSlice';
import { getSubstanceData } from '../Redux/Slices/SubstanceSlice';
import { getGroupData } from '../Redux/Slices/GroupSilce';

const SampleViewMore = () => {
  const { state } = useLocation();
  const { substanceData } = useSelector((state) => state.substance);
  const { groupData } = useSelector((state) => state.group);
  const [allSubstanceDataState, setAllSubstanceDataState] = useState([]);
  const [openDropdown, setOpenDropdown] = useState({});

  const [groupID,setGroupID]=useState();
  const [allGroupDataState, setAllGroupDataState] = useState([]);
  useEffect(() => {
      (async () => {
        await dispatch(getGroupData());
      })();
    }, []);
  useEffect(() => {
    setAllGroupDataState(groupData);
  }, [groupData])
  useEffect(()=>{
    const grpObj=allGroupDataState?.find((group)=>group.Group_Name===state.Group)
    if(grpObj){
      setGroupID(grpObj._id);
    }
  },[allGroupDataState])


  const toggleDropdown = (id, index) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [id]: {
        ...prev[id], // Preserve existing indices
        [index]: !prev[id]?.[index] // Toggle only the specific dropdown
      }
    }));
  };

  const [openMethodDropdown, setOpenMethodDropdown] = useState({});
  const toggleMethodDropdown = (id, index) => {
    setOpenMethodDropdown((prev) => ({
      ...prev,
      [id]: {
        ...prev[id], // Preserve existing indices
        [index]: !prev[id]?.[index] // Toggle only the specific dropdown
      }
    }));
  };

  const [openUnitDropdown, setOpenUnitDropdown] = useState({});
  const toggleUnitDropdown = (id, index) => {
    setOpenUnitDropdown((prev) => ({
      ...prev,
      [id]: {
        ...prev[id], // Preserve existing indices
        [index]: !prev[id]?.[index] // Toggle only the specific dropdown
      }
    }));
  };


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [dueDate, setDueDate] = useState();
  const [allUserDataState, setAllUserDataState] = useState([]);

  const { allUserData } = useSelector((state) => state.auth)
  useEffect(() => {
    (async () => {
      await dispatch(getAllUserData());
    })();
  }, []);
  useEffect(() => {
    setAllUserDataState(allUserData);
  }, [allUserData])
  useEffect(() => {
    (async () => {
      await dispatch(getSubstanceData());
    })();
  }, []);
  useEffect(() => {
    setAllSubstanceDataState(substanceData);
  }, [substanceData])
  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  }

  useEffect(() => {
    const initialRowData = {};
    state.Type_Of_Testing.forEach((testType) => {
      initialRowData[testType] = { Tests: [] };
      initialRowData[testType].Tests = state.Tests
        .filter((test) => test.Type_Of_Testing === testType)
        .map((test) => ({ Test: { "Test_Name": test.Test, "TestID": test._id }, Analyst: { "Name": '', "ID": '' }, Method: '', Unit: '', Result: '', Start_Date: null, End_Date: null, NABL: false }));
    });//make Test as an obj whith unique id
    setRowData(initialRowData);
  }, [state.Tests, state.Type_Of_Testing]);

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
  const updateRowData = (testType, index, field, value, ID) => {
    if (ID) {
      const updatedRowData = { ...rowData };
      const obj = {
        "Name": value,
        "ID": ID
      }
      updatedRowData[testType].Tests[index][field] = obj;
      setRowData(updatedRowData);
    }
    else {

      const updatedRowData = { ...rowData };
      updatedRowData[testType].Tests[index][field] = value;
      setRowData(updatedRowData);
    }
  };


  const [applyToAllAnalyst, setApplyToAllAnalyst] = useState({
    "Name": '',
    "ID": ''
  }); // Track Analyst for "Apply to All"

  const handleApplyToAllAnalyst = (analyst, testType) => {
    // Updates all rows with the selected Analyst value
    const updatedRowData = { ...rowData }
    updatedRowData[testType].Tests = rowData[testType].Tests.map((row) => ({
      ...row,
      Analyst: {
        ...row.Analyst,
        Name: analyst.Name,
        ID: analyst.ID
      }
    }));
    setRowData(updatedRowData);
    setApplyToAllAnalyst(analyst);
  }

  const handleApplyToAllMethod = (methodValue, testType) => {
    // Updates all rows with the selected Analyst value
    const updatedRowData = { ...rowData }
    updatedRowData[testType].Tests = rowData[testType].Tests.map((row) => ({
      ...row,
      Method: methodValue,
    }));
    setRowData(updatedRowData);
    // setApplyToAllMethod(methodValue);
  };

  const handleApplyToAllUnit = (unitValue, testType) => {
    // Update all rows with the selected Analyst value
    const updatedRowData = { ...rowData }
    updatedRowData[testType].Tests = rowData[testType].Tests.map((row) => ({
      ...row,
      Unit: unitValue,
    }));
    setRowData(updatedRowData);
  };


  //To Update the "Apply to All" checkbox handling
  const handleApplyToAllAnalystBtn = (isChecked, testType) => {

    if (isChecked && applyToAllAnalyst) {
      handleApplyToAllAnalyst(applyToAllAnalyst, testType);
    }
  };
  const handleApplyToAllMethodBtn = (isChecked, testType, testIndex) => {
    if (isChecked && testType && testIndex>=0) {
      handleApplyToAllMethod(rowData[testType].Tests[testIndex]?.Method, testType);
    }
  }
  const handleApplyToAllUnitBtn = (isChecked, testType, testIndex) => {
    if (isChecked && testType && testIndex>=0) {
      handleApplyToAllUnit(rowData[testType].Tests[testIndex]?.Unit, testType);
    }
  }
  const handleSubmit = async () => {
    if (!dueDate) {
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
          toast.error(`Method is required at Type Of Testing: ${key}, Test: ${test.Test.Test_Name}, Index: ${testIndex + 1}`);
          flag = true;
          break;
        }
        if (test.Unit === '') {
          toast.error(`Unit is required at Type Of Testing: ${key}, Test: ${key}, Index: ${testIndex + 1}`);
          flag = true;
          break;
        }
        if (test.Analyst.Name === '' || test.Analyst.ID === '') {
          toast.error(`Analyst is required at Type Of Testing: ${key}, Test: ${test.Test.Test_Name}, Index: ${testIndex + 1}`);
          flag = true;
          break;
        }
      }

      if (flag) break; // Stop execution if an error is found
    }

    if (flag) return; // Prevent further execution

    const allotmentData = {
      "TM_Data": rowData,
      "Due_Date": dueDate,
      "Sample_Id": state._id,
      "TM_Status": "Pending At Analyst",
    }
    const res = await dispatch(sendTMData(allotmentData));
    if (res?.payload?.success) {
      const ID = state._id
      const obj = {
        "ID": ID,
        "Status": "Pending At Analyst"
      };
      const response = await dispatch(updateSample(obj))
      if (response?.payload?.success) {
        //here in res?.payload?.success ,the success parameter comes from res.json at backend
        toast.success("data submitted successfully")
        navigate('/SampleAllotment')
      }
    }
    else {
      toast.error("Please fill all the fields");
    }
  }
  return (
    <div>
      <div className="mt-3 mb-2 border-2 border-md border-blue-600 bg-zinc-100 py-2 px-4 w-3/5 mx-auto rounded-md">
        <div className='flex justify-center gap-2'><b className='text-lg'>Due Date<span className="text-red-500">*</span>:</b> <input type="date" name="DueDate" id="DueDate" min={state.Date.split('T')[0]} onChange={(e) => handleDueDate(e)} className='px-4 border-2 border-blue-600' /></div>
      </div>
      <br />
      <div className='w-full'>
        {sections.map((section) => (
          <div key={section.id} className='w-full'>
            <div className="w-full p-4 bg-gray-200 mb-12">
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

                <div className={`p-4 ${state.Tests.filter((item) => item.Type_Of_Testing === section.testType).length > 3
                  ? "max-h-[600px] overflow-y-auto"
                  : ""
                  }`}>
                  {state.Tests.filter(
                    (item) => item.Type_Of_Testing === section.testType
                  ).map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-4 mb-4 p-3 border border-gray-200 rounded-lg shadow-sm bg-gray-100"
                    >
                      <div className="font-bold rounded-md px-2 pt-6">{index + 1}.</div>
                      <div className="flex items-center border-l-2 pl-2">
                        <span>{item.Test}</span>
                      </div>
                      <div>
                        <button
                          className="bg-sky-600 text-white p-2 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
                          onClick={() => handleApplyToAllAnalystBtn(true, section.testType)}
                        >
                          Apply to All
                        </button>
                        <select
                          className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full mt-1"
                          onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            const selectedId = selectedOption.id;
                            updateRowData(section.testType, index, 'Analyst', e.target.value, selectedId);
                            setApplyToAllAnalyst(() => ({
                              "Name": e.target.value,
                              "ID": selectedOption.id
                            })); // Track the value for "Apply to All"
                          }}
                          value={rowData[section.testType].Tests[index]?.Analyst?.Name || ''}
                        >
                          <option value="" id=''>Select Analyst</option>
                          {
                            allUserDataState
                              ?.filter((element) => element.Active_Status === true)
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

                      <div className="relative">
                        <button
                          className="bg-sky-600 text-white p-2 mb-1 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
                          onClick={() => handleApplyToAllMethodBtn(true, section.testType, index)}
                        >
                          Apply to All
                        </button>

                        {/* Custom dropdown using <ul> */}
                        <div className="relative">
                          <button
                            className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full text-left"
                            onClick={() => toggleMethodDropdown(section.id, index)} // Toggle dropdown visibility
                          >
                            {rowData[section.testType].Tests[index]?.Method || "Select Method"}
                          </button>
                          {/* Dropdown options */}
                          {openMethodDropdown[section.id]?.[index] && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full shadow-lg max-h-48 overflow-y-auto">
                              <li
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  updateRowData(section.testType, index, "Method", "");
                                  setOpenMethodDropdown((prev) => !prev);
                                }}
                              >
                                Method
                              </li>

                              {(() => {
                                const allMethods = allSubstanceDataState
                                  ?.filter((subs)=>subs.GroupID===groupID)
                                  ?.filter((substance) => {
                                    const group = allGroupDataState?.find((group) => group.Group_Name === state.Group);
                                    const matchedTestID = group?.Tests.find((test) => test.Test === item.Test)?._id;
                                    return substance?.Test.TestID === matchedTestID;
                                  }) // Filter first
                                  ?.flatMap((substance) => substance.MethodUnitList?.flatMap((met) => met.Method) || []);
                                // Ensures uniqueness
                                const uniqueMethods = [...new Set(allMethods)];
                                return uniqueMethods.map((ele, ele_idx) => (
                                  <li
                                    key={`${ele}-${ele_idx}`}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      updateRowData(section.testType, index, "Method", ele);
                                      setOpenMethodDropdown((prev) => !prev);
                                    }}
                                  >
                                    {ele}
                                  </li>
                                ));
                              })()}

                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          className="bg-sky-600 text-white p-2 mb-1 rounded-md text-xs hover:bg-sky-800 focus:outline-none"
                          onClick={() => handleApplyToAllUnitBtn(true, section.testType, index)}
                        >
                          Apply to All
                        </button>

                        {/* Custom dropdown using <ul> */}
                        <div className="relative">
                          <button
                            className="bg-white p-2 border border-gray-300 rounded-lg text-gray-700 w-full text-left"
                            onClick={() => toggleUnitDropdown(section.id, index)} // Toggle dropdown visibility
                          >
                            {rowData[section.testType].Tests[index]?.Unit || "Select Unit"}
                          </button>
                          {/* Dropdown options */}
                          {openUnitDropdown[section.id]?.[index] && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full shadow-lg max-h-48 overflow-y-auto">
                              <li
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  updateRowData(section.testType, index, "Unit", "");
                                  setOpenUnitDropdown((prev) => !prev);
                                }}
                              >
                                Unit
                              </li>
                              {(() => {
                                const allUnits = allSubstanceDataState
                                  ?.filter((subs)=>subs.GroupID===groupID)
                                  ?.filter((substance) => {
                                    const group = allGroupDataState?.find((group) => group.Group_Name === state.Group);
                                    const matchedTestID = group?.Tests.find((test) => test.Test === item.Test)?._id;
                                    return substance?.Test.TestID === matchedTestID;
                                  }) // Filter first
                                  ?.flatMap((substance) => substance.MethodUnitList?.flatMap((met) => met.Unit) || []);
                                // Ensures uniqueness
                                const uniqueUnits = [...new Set(allUnits)];
                                return uniqueUnits.map((ele, ele_idx) => (
                                  <li
                                    key={`${ele}-${ele_idx}`}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      updateRowData(section.testType, index, "Unit", ele);
                                      setOpenUnitDropdown((prev) => !prev);
                                    }}
                                  >
                                    {ele}
                                  </li>
                                ));
                              })()}
                              
                            </ul>
                          )}
                        </div>
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