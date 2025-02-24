
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupData } from "../../../Redux/Slices/GroupSilce";
import { sendSubstanceData } from "../../../Redux/Slices/SubstanceSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminCommomNav from "../../../components/AdminCommomNav";

const AddMethod = () => {
    const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedGroupID, setSelectedGroupID] = useState("");
  const { groupData } = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const [allGroupDataState, setAllGroupDataState] = useState([]);
  const [testSection, setTestSection] = useState([
    {
      Test_Name: "",
      Test_ID: "",
      methodSection: [
        {
          Method: "",
          Unit: "",
          Limit:"",
        },
      ],
    },
  ]);

  useEffect(()=>{
    const findObj=allGroupDataState.find((item)=>item.Group_Name===selectedGroup)
    if(findObj){
        setSelectedGroupID(findObj._id)
    }
  },[selectedGroup])
  console.log(selectedGroupID,"fjejf")
  useEffect(() => {
    (async () => {
      await dispatch(getGroupData());
    })();
  }, []);

  useEffect(() => {
    setAllGroupDataState(groupData);
  }, [groupData]);

  // Function to update testSection values
  const updateTestSection = (index, key, value) => {
    setTestSection((prev) =>
      prev.map((test, i) =>
        i === index
          ? {
              ...test,
              [key]: value,
            }
          : test
      )
    );
  };
  const updateTestIDSection = (index, key, value) => {
    console.log("first",value)
    setTestSection((prev) =>
      prev.map((test, i) =>
        i === index
          ? {
              ...test,
              [key]: value,
            }
          : test
      )
    );
  };

  // Function to update methodSection values inside a testSection
  const updateMethodSection = (testIndex, methodIndex, key, value) => {
    setTestSection((prev) =>
      prev.map((test, i) =>
        i === testIndex
          ? {
              ...test,
              methodSection: test.methodSection.map((method, j) =>
                j === methodIndex
                  ? {
                      ...method,
                      [key]: value,
                    }
                  : method
              ),
            }
          : test
      )
    );
  };

  // Add a new test section
  const addTestSection = () => {
    setTestSection((prev) => [
      ...prev,
      {
        Test_Name: "",
        Test_ID: "",
        methodSection: [
          {
            Method: "",
            Unit: "",
            Limit:"",
          },
        ],
      },
    ]);
  };

  // Add a new method to a specific test section
  const addMethod = (testIndex) => {
    setTestSection((prev) =>
      prev.map((test, i) =>
        i === testIndex
          ? {
              ...test,
              methodSection: [
                ...test.methodSection,
                {
                  Method: "",
                  Unit: "",
                  Limit:"",
                },
              ],
            }
          : test
      )
    );
  };

  // Remove a test section
  const removeTestSection = (index) => {
    if(index>0){
      setTestSection((prev) => prev.filter((_, i) => i !== index));
    }
    else if(index===0){
      toast.error("At least One Test Section is Required")
    }
  };

  // Remove a method from a specific test section
  const removeMethod = (testIndex, methodIndex) => {
    if(methodIndex>0){
      setTestSection((prev) =>
        prev.map((test, i) =>
          i === testIndex
            ? {
                ...test,
                methodSection: test.methodSection.filter(
                  (_, j) => j !== methodIndex
                ),
              }
            : test
        )
      );
    }
    else if(methodIndex===0){
      toast.error("At least One Method is Required");
    }
  };

  // Get all selected test names to exclude them from dropdowns
  const getSelectedTests = () => {
    return testSection.map((test) => test.Test_Name).filter((name) => name);
  };
console.log("nop",testSection);

const applyToAllMethod = (testIndex, methodIndex) => {
  setTestSection((prev) => {
    const { Method, Unit, Limit } = prev[testIndex].methodSection[methodIndex]; // Get values to apply

    return prev.map((test) => ({
      ...test,
      methodSection: test.methodSection.map((method, j) =>
        j === methodIndex
          ? { ...method, Method, Unit, Limit } // Apply values to matching method index
          : method
      ),
    }));
  });
};


const handleSubmit=async()=>{
    if(!selectedGroup || !selectedGroupID){
        toast.error("Choose A Group");
        return
    }
    let hasError = false;

    testSection?.forEach((item,index) => {
        if (!item.Test_Name) {
            toast.error(`Section-${index+1} Test Name Is Necessary`);
            hasError = true;
            return; // Exit the current iteration of the outer loop
        }
        if (!item.Test_ID) {
            toast.error(`Section-${index+1} Test ID Is Necessary`);
            hasError = true;
            return;
        }
        const methodSet = new Set(); 
        item.methodSection?.forEach((data,i) => {
            if (!data.Method) {
                toast.error(`Section-${index+1} Line-${i+1} Method  Is Necessary`);
                hasError = true;
                return; // Exit the current iteration of the inner loop
            }
            if (!data.Unit) {
                toast.error(`Section-${index+1} Line-${i+1} Unit Is Necessary`);
                hasError = true;
                return;
            }
            const methodKey = `${data.Method.trim()}-${data.Unit.trim()}-${data.Limit.trim()}`;
            if (methodSet.has(methodKey)) {
                toast.error(`Duplicate method found in Section-${index + 1}, Line-${i + 1}`);
                hasError = true;
                return;
            } else {
                methodSet.add(methodKey.trim());
            }
        });

        if (hasError) return; // Exit the outer loop if an error is found
    });

    if (hasError) return; // Exit the entire function if an error is found
  
    const data={
        "Substance_Data":testSection,
        "GroupID":selectedGroupID
    }
    try {
        const res = await dispatch(sendSubstanceData(data));
        if (res?.payload?.success) {
            toast.success("Methdod Added Successfully");
            navigate("/Admin/Substance/MethodList");
        }
    } catch (error) {
        toast.error(error?.message || "An error occurred.");
    }
}
console.log("testSection",testSection)
  return (
    <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
      <AdminCommomNav/>
            <div className="w-full p-4">
                <button
                    className="bg-indigo-700 px-8 py-1 text-white rounded-md float-right"
                    onClick={() => navigate("/Admin/Substance/MethodList")}
                >
                    Back
                </button>
            </div>
      <br /><br /><br />
      <div className="flex flex-col border-2 border-blue-600 bg-gray-200 mt-8 w-4/5 justify-center m-auto p-2 shadow-[0_0_6px_gray]">

        <div className="flex justify-center m-auto w-full p-4">
            <div className="w-full ">
            {/* Group Selection */}
            <select
                className="w-full border-2 border-gray-700 p-2 mb-4 outline-0 "
                onChange={(e) => setSelectedGroup(e.target.value)}
            >
                <option value="">Choose Group</option>
                {allGroupDataState.map((item) => (
                <option value={item.Group_Name} key={item._id}>
                    {item.Group_Name}
                </option>
                ))}
            </select>

            {selectedGroup && (
                <div>
                {testSection.map((test, testIndex) => (
                    <div
                    className="mb-4 border-2 border-gray-700 p-4"
                    key={`test-${testIndex}`}
                    >
                    <div className="flex gap-4 mb-2">
                        {/* Test Name */}
                        <div className="w-full">
                        <select
                            className="w-full border-2 border-blue-700 p-2 outline-0"
                            value={test.Test_Name}
                            onChange={(e) => {
                              const selectedTestName = e.target.value;
                              const selectedTestOption = allGroupDataState
                                  .filter((grp) => grp.Group_Name === selectedGroup)
                                  .flatMap((group) => group.Tests)
                                  .find((testOption) => testOption.Test === selectedTestName);
                      
                              // Update both Test_Name and Test_ID
                              updateTestSection(testIndex, "Test_Name", selectedTestName);
                              if (selectedTestOption) {
                                  updateTestIDSection(testIndex, "Test_ID", selectedTestOption._id);
                              }
                          }}
                        >
                            <option value="">Select Test</option>
                            {allGroupDataState
                            .filter((grp)=>grp.Group_Name===selectedGroup)
                            .flatMap((group) => group.Tests)
                            .filter(
                                (testOption) =>
                                !getSelectedTests().includes(testOption.Test) ||
                                testOption.Test === test.Test_Name
                            )
                            .map((testOption) => (
                                <option value={testOption.Test} key={testOption._id}>
                                {testOption.Test}
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>

                    {/* Method Section */}
                    {test.methodSection.map((method, methodIndex) => (
                        <div
                        className="flex sm:flex-row flex-col gap-4 mb-2"
                        key={`method-${testIndex}-${methodIndex}`}
                        >
                        <div className="sm:w-1/3 w-full">
                            <input
                            type="text"
                            placeholder="Enter Method"
                            name={`name-method-${testIndex}-${methodIndex}`}
                            value={method.Method}
                            onChange={(e) =>
                                updateMethodSection(
                                testIndex,
                                methodIndex,
                                "Method",
                                e.target.value
                                )
                            }
                            className="w-full border-2 border-blue-700 p-2 outline-0"
                            />
                        </div>
                        <div className="sm:w-1/3 w-full">
                            <input
                            type="text"
                            placeholder="Enter Unit"
                            value={method.Unit}
                            name={`name-unit-${testIndex}-${methodIndex}`}
                            onChange={(e) =>
                                updateMethodSection(
                                testIndex,
                                methodIndex,
                                "Unit",
                                e.target.value
                                )
                            }
                            className="w-full border-2 border-blue-700 p-2 outline-0"
                            />
                        </div>
                        <div className="sm:w-1/3 w-full">
                            <input
                            type="text"
                            placeholder="Enter Limit"
                            value={method.Limit}
                            name={`name-limit-${testIndex}-${methodIndex}`}
                            onChange={(e) =>
                                updateMethodSection(
                                testIndex,
                                methodIndex,
                                "Limit",
                                e.target.value
                                )
                            }
                            className="w-full border-2 border-blue-700 p-2 border"
                            />
                        </div>
                        
                        <button
                            className="bg-blue-600 text-white text-sm px-4 py-1 rounded"
                            onClick={() => applyToAllMethod(testIndex, methodIndex)}
                        >
                            Apply To All
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded"
                            onClick={() => removeMethod(testIndex, methodIndex)}
                        >
                            Remove
                        </button>
                        </div>
                    ))}

                      <div className="flex sm:flex-row flex-col">
                        <button
                            className="bg-green-500 text-white px-4 py-1 rounded sm:mt-2"
                            onClick={() => addMethod(testIndex)}
                        >
                            Add Method
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded mt-2 sm:ml-4"
                            onClick={() => removeTestSection(testIndex)}
                        >
                            Remove Test Section
                        </button>
                      </div>
                    </div>
                ))}
                
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={addTestSection}
                >
                    Add Test Section
                </button>
                </div>
            )}
            </div>
        </div>
        <div className="w-full flex justify-center"><button className="bg-indigo-700 px-8 py-1 rounded-md text-white hover:bg-indigo-800 text-lg" onClick={handleSubmit}>Submit</button></div>
      </div>
    </div>
  );
};

export default AddMethod;

