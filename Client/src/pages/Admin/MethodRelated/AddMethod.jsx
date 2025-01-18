
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupData } from "../../../Redux/Slices/GroupSilce";
import { sendSubstanceData } from "../../../Redux/Slices/SubstanceSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  };

  // Get all selected test names to exclude them from dropdowns
  const getSelectedTests = () => {
    return testSection.map((test) => test.Test_Name).filter((name) => name);
  };
console.log("nop",testSection);

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
            toast.success("Methdod And Unit Successfully Added");
            navigate("/Admin/Substance/MethodList");
        }
    } catch (error) {
        toast.error(error?.message || "An error occurred.");
    }
}
const handleDelete=async(userID)=>{
    try {
      console.log(userID,"judju")
      const data={
        "userID":userID
      }
      const response = await dispatch(DeleteUserData(data));
      if (response?.payload?.success) {
        toast.success('User Deleted Successfully');
        navigate('/Admin/Home')
      }
    } catch (error) {
        toast.error(error)
    }
  }
  return (
    <div className="h-screen w-screen">
        <div className="w-full flex border-2 bg-gray-300 border-gray-700 shadow p-5">
            <div className="w-3/5 text-3xl font-bold pr-24">
                <span className="float-right">Add Method</span>
            </div>
            <div className="w-2/5">
                <button
                    className="bg-indigo-700 px-4 py-1 text-white rounded-md float-right"
                    onClick={() => navigate("/Admin/Substance/MethodList")}
                >
                    Back
                </button>
            </div>
        </div>
      <br /><br /><br />
      <div className="flex flex-col border-2 border-blue-700 bg-gray-100 mt-8 w-3/4 justify-center m-auto p-2">

        <div className="flex justify-center m-auto w-full p-4">
            <div className="w-full ">
            {/* Group Selection */}
            <select
                className="w-full border-2 border-blue-700 p-2 mb-4"
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
                    className="mb-4 border-2 border-blue-700 p-4"
                    key={`test-${testIndex}`}
                    >
                    <div className="flex gap-4 mb-2">
                        {/* Test Name */}
                        <div className="w-full">
                        <select
                            className="w-full border-2 border-blue-700 p-2"
                            value={test.Test_Name}
                            // onChange={(e) =>
                            // updateTestSection(
                            //     testIndex,
                            //     "Test_Name",
                            //     e.target.value,
                            // )
                            // }
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
                        className="flex gap-4 mb-2"
                        key={`method-${testIndex}-${methodIndex}`}
                        >
                        <div className="w-1/2">
                            <input
                            type="text"
                            placeholder="Enter Method"
                            value={method.Method}
                            onChange={(e) =>
                                updateMethodSection(
                                testIndex,
                                methodIndex,
                                "Method",
                                e.target.value
                                )
                            }
                            className="w-full border-2 border-blue-700 p-2 border"
                            />
                        </div>
                        <div className="w-1/2">
                            <input
                            type="text"
                            placeholder="Enter Unit"
                            value={method.Unit}
                            onChange={(e) =>
                                updateMethodSection(
                                testIndex,
                                methodIndex,
                                "Unit",
                                e.target.value
                                )
                            }
                            className="w-full border-2 border-blue-700 p-2 border"
                            />
                        </div>
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded"
                            onClick={() => removeMethod(testIndex, methodIndex)}
                        >
                            Remove
                        </button>
                        </div>
                    ))}

                    <button
                        className="bg-green-500 text-white px-4 py-1 rounded mt-2"
                        onClick={() => addMethod(testIndex)}
                    >
                        Add Method
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-1 rounded mt-2 ml-4"
                        onClick={() => removeTestSection(testIndex)}
                    >
                        Remove Test Section
                    </button>
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
        <div className="w-full flex justify-center"><button className="bg-indigo-700 px-4 py-1 rounded-md text-white hover:bg-indigo-800" onClick={handleSubmit}>Submit</button></div>
      </div>
    </div>
  );
};

export default AddMethod;

