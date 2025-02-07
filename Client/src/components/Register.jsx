
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { getGroupData } from "../Redux/Slices/GroupSilce";
import { registerSample } from "../Redux/Slices/SampleSlice";
import { useNavigate } from "react-router-dom";
import { getError } from "../Redux/Slices/ExtraSlice";
import UserCommonNav from "./UserCommonNav";

const Register = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { errorData } = useSelector((state) => state.administration);
  const { groupData } = useSelector((state) => state.group);
  console.log("mrsfnejgojrioejg",groupData)
  const userData =JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    (async () => {
      await dispatch(getGroupData());
    })();
  }, []);
  
  const [errorDataState, setErrorDataState] = useState([]);
  const [groups, setGroup] = useState([])
  const [choosenGroup, setChoosenGroup] = useState('');
  const [analysisData, setAnalysisData] = useState([]);
  const [testData, setTestData] = useState([])

  useEffect(() => {
    (async () => {
      await dispatch(getError());
    })();
  }, []);

  useEffect(() => {
    setErrorDataState(errorData);
  }, [errorData])

  useEffect(()=>{
    setGroup(groupData)
  },[groupData])

  // For  type of testing search
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const filtered = analysisData?.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);

  //for tests section
  const [testSearch, setTestSearch] = useState({});
  const [filteredTestItems, setFilteredTestItems] = useState({});
  
  const handleTestSearchChange = (group, value) => {
    setTestSearch((prev) => ({
      ...prev,
      [group]: value,
    }));

    if (value.length > 0) {
      const filteredItems = Object.keys(selectedTests[group].subTests).filter((sub) =>
        sub.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredTestItems((prev) => ({
        ...prev,
        [group]: filteredItems,
      }));
    } else {
      setFilteredTestItems((prev) => ({
        ...prev,
        [group]: [],
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);//To extract the data from the form
    const Name = formData.get("Name");
    const Quantity = formData.get("Quantity");
    const Storage_Condititons = formData.get("Storage_Conditions");
    const Customer_Code = formData.get("Customer_Code");
    const Packing_Type = formData.get("Packing_Type");
    const Date = formData.get("Date");
    const Mfg_Date = formData.get("Mfg_Date");
    const Treatment_Type = formData.get("Treatment_Type");
    const Nature_Of_Sample = formData.get("Nature_Of_Sample");
    const Issued_To = formData.get("Issued_To");
    const Remarks=formData.get("Remarks");
    const Group = formData.get("Group");
    const Type_Of_Testing = [];
    Object.keys(selectedAnalysis).map((key) => {
      if (selectedAnalysis[key] === true) { Type_Of_Testing.push(key) }
    })
    console.log(Type_Of_Testing, "sor");
    const Tests = []
    //Using Object.keys here to iterate throught the objects
    Object.keys(selectedTests).map((group) => {
      Object.keys(selectedTests[group].subTests).map((sub) => {
        if (selectedTests[group].subTests[sub] === true) {
          const objTest = {
            "Type_Of_Testing": group,
            "Test": sub
          }
          Tests.push(objTest)

        }
      })
    })

    console.log(Tests, "sor1")
    console.log(Name, Quantity, Storage_Condititons, Customer_Code, Packing_Type, Date,Mfg_Date, Treatment_Type,Nature_Of_Sample, Remarks, Issued_To,Group, selectedAnalysis, selectedTests, "jjj")
    if(!Name || !Quantity || !Storage_Condititons || !Customer_Code || !Packing_Type || !Date || !Mfg_Date || !Nature_Of_Sample || !Issued_To || !Remarks || !Group || !Type_Of_Testing.length || !Tests.length){
      toast.error("All fields are necessary");
      return
    }
    let allTestingSelected=[];
    for(let test of Tests){
      if(!(allTestingSelected.includes(test.Type_Of_Testing))){
        allTestingSelected.push(test.Type_Of_Testing)
      }
    }
    console.log("lenght",allTestingSelected,allTestingSelected.length);
    if(allTestingSelected.length !== Type_Of_Testing.length){
      toast.error("Select At Least One Test in From Each Type Of Testing Selected");
      return;
    }
    const data={
      "Name":Name,
      "Quantity":Quantity,
      "Storage_Conditions":Storage_Condititons,
      "Customer_Code":Customer_Code,
      "Packing_Type":Packing_Type,
      "Date":Date,
      "Mfg_Date":Mfg_Date,
      "Treatment_Type":Treatment_Type,
      "Nature_Of_Sample":Nature_Of_Sample,
      "Issued_To":Issued_To,
      "Remarks":Remarks,
      "Group":Group,
      "Type_Of_Testing":Type_Of_Testing,
      "Tests":Tests,
      "ID":userData._id
    }
    console.log(data,"Dkwod",Tests)
    try {
      const response = await dispatch(registerSample(data));
      if (response?.payload?.success) {
        toast.success('Sample Registered Successfully');
        navigate('/Sample Registration/Home')
      }
    } catch (error) {
        toast.error(error)
    }
  };


  useEffect(() => {
    if (choosenGroup !== '') {
      const filteredGroup = groups.find((group) => group.Group_Name === choosenGroup);
      if (filteredGroup) {
        // setAnalysisData(filteredGroup.Type_Of_Testing);
        const TypeOfTestingData=[]
        const data = [];
        
        filteredGroup?.Tests?.forEach((item) => {
          // Check if the object for this Type_Of_Testing already exists
          const existingObj = data.find((obj) => obj.name === item.Type_Of_Testing);
          
          if(!(TypeOfTestingData.includes(item.Type_Of_Testing))){
            TypeOfTestingData.push(item.Type_Of_Testing)
          }
          if (existingObj) {
            // If it exists, push the new sub-test into its subTests array
            existingObj.subTests.push(item.Test);

          } else {
            // If it doesn't exist, create a new object and push it to data
            data.push({
              name: item.Type_Of_Testing,
              subTests: [item.Test],
            });
          }
        });
        setAnalysisData(TypeOfTestingData);
        setTestData(data);
      }
    }
  }, [choosenGroup]);

  //analysis data is without true false
  const initialStateOfAnanlysis = analysisData?.reduce((acc, key) => {
    acc[key] = false; // Set default value (false) for each key
    return acc;
  }, {});

  const [selectedAnalysis, setSelectedAnalysis] = useState([]);//analysis data with true false

  useEffect(() => {
    if (analysisData != []) {

      setSelectedAnalysis(initialStateOfAnanlysis);
    }
  }, [analysisData])

  console.log(selectedAnalysis, "www")
  // const [selectedTests, setSelectedTests] = useState({
  //   Proximate: { isChecked: false, subTests: { Protein: false, Fibre: false } },
  //   Vitamins: { isChecked: false, subTests: { B12: false, B6: false, B2: false } },
  //   Mineral: { isChecked: false, subTests: { Iron: false, Calcium: false } },
  // });
  // const testData = [
  //   { name: "Proximate", subTests: ["Protein", "Fibre"] },
  //   { name: "Vitamins", subTests: ["B12", "B6", "B2"] },
  //   { name: "Mineral", subTests: ["Iron", "Calcium"] },
  // ];

  // Create initial state dynamically
  const generateInitialStateOfTestData = (data) => {
    console.log(data, "ttt")
    return data.reduce((acc, test) => {
      acc[test.name] = {
        isChecked: false,
        subTests: test.subTests.reduce((subAcc, subTest) => {
          subAcc[subTest] = false; // Initialize sub-tests as false
          return subAcc;
        }, {}),
      };
      console.log(acc, "ccc")
      return acc;
    }, {});
  };
  useEffect(() => {
    setSelectedTests(generateInitialStateOfTestData(testData))
  }, [testData])

  const [selectedTests, setSelectedTests] = useState({})
  console.log(selectedTests, "seletedTests")
  // Handle "Type of Analysis" section
  const handleAnalysisChange = (e) => {
    const { name, checked } = e.target;
    setFilteredItems([]);
    const errorObj=errorDataState.find((error)=>error.Type_Of_Testing === name && error.Group_Name=== choosenGroup)
    if(errorObj){
      toast.error(`${name}-${errorObj.Error_Message}`);
      return;
    }
    setSelectedAnalysis((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // If unchecked, reset the corresponding group and sub-options in "Test to be Done"
    setSelectedTests((prev) => ({
      ...prev,
      [name]: {
        isChecked: false,
        subTests: Object.keys(prev[name].subTests).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}),
      },
    }));
  };

  // Handle group checkbox in "Test to be Done"
  const handleGroupTestChange = (group, checked) => {
    setSelectedTests((prev) => ({
      ...prev,
      [group]: {
        isChecked: checked,
        subTests: Object.keys(prev[group].subTests).reduce((acc, key) => {
          acc[key] = checked;
          return acc;
        }, {}),
      },
    }));
  };

  // Handle individual sub-test checkboxes
  const handleSubTestChange = (group, testName, checked) => {
    setFilteredTestItems([]);
    setSelectedTests((prev) => {
      const updatedSubTests = {
        ...prev[group].subTests,
        [testName]: checked,
      };

      // Determine if all sub-tests are checked
      const allChecked = Object.values(updatedSubTests).every(Boolean);

      return {
        ...prev,
        [group]: {
          isChecked: allChecked,
          subTests: updatedSubTests,
        },
      };
    });
  };

  const groupFunction = (GroupName) => {
    console.log(GroupName)
    if (GroupName == "Select") {
      alert("Please Select A Group")
    }
    else {
      setChoosenGroup(GroupName);
      console.log("gdgrt")
    }

  }
  console.log("analsisData12",analysisData)
  return (
    <>
      <form onSubmit={handleSubmit} className=" max-w-screen mx-auto">
        <UserCommonNav assignedRole='Sample Registration'/>
        <div className='w-full p-5'>
          <div className='w-full'><button type="button" className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Sample Registration/Home')}>Back</button></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2 w-full">
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Name</label>
            <input
              type="text"
              name="Issued_To"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
              placeholder="Issued To..."
            />
          </div>
          <div>
          <label className="block text-sm font-semibold mb-2">Nature Of Sample</label>
          <input
            type="text"
            name="Nature_Of_Sample"
            className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
            required
            placeholder="Enter Nature Of Sample..."
          />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Sample Name</label>
            <input
              type="text"
              name="Name"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
              placeholder="Enter Sample Name..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Registration Date</label>
            <input
              type="Date"
              name="Date"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
              placeholder="Enter Registration Date..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Code</label>
            <input
              type="text"
              name="Customer_Code"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
              placeholder="Enter Customer Code..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Manufacturing Date</label>
            <input
              type="date"
              name="Mfg_Date"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
              placeholder="Enter Manufacturing Date..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="text"
              name="Quantity"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
              placeholder="Enter Sample Quantity..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Storage Conditions(in ℃)</label>
            <input
              type="number"
              name="Storage_Conditions"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
              placeholder="Enter Storage Conditions..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Packing Type</label>
            <select
              name="Packing_Type"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              required
            >
              <option value="SEALED">SEALED</option>
              <option value="UNSEALED">UNSEALED</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1">

          <div className="p-2">
            <label className="block text-sm font-semibold mb-2">Treatment Type</label>
            <input
              type="text"
              name="Treatment_Type"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              placeholder="Enter Treatment Type..."
            />
          </div> 
          <div className="p-2">
            <label className="block text-sm font-semibold mb-2">Group</label>
            <select
              name="Group"
              className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
              onChange={(e) => groupFunction(e.target.value)}
              required
              
            >
              <option value="Select">Select</option>
              {
                groups.map((group, key) => {
                  return <option key={key} value={group.Group_Name}>{group.Group_Name}</option>
                })
              }


            </select>
          </div>
          <div className="px-2 pt-2 pb-0">
              <h2 className="text-sm font-semibold mb-2">Type of Testing</h2>

              <div className={`${choosenGroup!=''?'p-4 border border-gray-600 rounded-md':' rounded-md'}`}>
                {
                  choosenGroup!=''?
                    <input type="text" placeholder="Search..." value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-1 border-2 border-blue-600 rounded w-full outline-0"
                    />
                    :<div className="">
                      <select name="" id="" className="w-full border-2 border-blue-600 rounded-md p-2 outline-0">
                        <option value="Select" className="">Select</option>
                      </select>
                    </div>
                }
                {
                  (filteredItems.length === 0) && query.trim() !== "" ? (
                    <div className="text-white text-sm">No results found</div>
                  ) :
                    !(filteredItems.length > 0) ? (
                      // <div key={index}>{item}</div>
                      <div
                        className={`${Object.keys(selectedAnalysis).length > 3
                          ? "max-h-64 overflow-y-auto mt-3 p-1"
                          : "mt-3 p-1"
                          }`}
                      >
                        {Object.keys(selectedAnalysis).map((key,index) => (
                          <div key={`${key}-${index}`} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name={key}
                              checked={selectedAnalysis[key]}
                              onChange={handleAnalysisChange}
                              className="rounded-md outline-0"
                            />
                            <label className="text-sm">{key}</label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className={`${Object.keys(selectedAnalysis).length > 3
                          ? "max-h-64 overflow-y-auto"
                          : ""
                          } border-2 border-blue-600 rounded-md p-2 mt-3`}
                      >
                        {filteredItems?.map((data, i) => (
                          <div key={`${data}-${i}`} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name={data}
                              checked={selectedAnalysis[data]}
                              onChange={handleAnalysisChange}
                              className="rounded-md outline-0"
                            />
                            <label className="text-sm">{data}</label>
                          </div>
                        ))}
                      </div>
                    )
                } 
              </div>
            </div> 
            <div className="pt-0 px-2 pb-2">
              <h2 className="text-sm font-semibold mb-2">Tests</h2>
              {
                choosenGroup==''?(
                  <div className="w-full">
                    <select name="" id="" className="w-full border-2 border-blue-600 rounded-md p-2 outline-0">
                      <option value="Select" className="">Select</option>
                    </select>
                  </div>
                )
              :
              <div
                className={` p-2 ${Object.keys(selectedTests).filter((group) => selectedAnalysis[group])
                  .length > 1
                  ? "max-h-[600px] overflow-y-auto"
                  : ""
                  }`}
              >
                {Object.keys(selectedTests).map((group) => {
                  if (!selectedAnalysis[group]) return null;
                  const searchValue = testSearch[group] || ""
                  const filtered_Items = filteredTestItems[group] || []
                  return (
                    <div key={group} className="space-y-2">

                      <div className="font-bold text-lg">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedTests[group].isChecked}
                            onChange={(e) => handleGroupTestChange(group, e.target.checked)}
                            className="rounded-md outline-0"
                          />
                          <span>{group}</span>
                        </div>
                      </div>


                      <div
                        className={`ml-6 border rounded-md p-2 ${Object.keys(selectedTests[group].subTests).length > 1
                          ? "max-h-64 overflow-y-auto border border-gray-700"
                          : "border border-gray-700"
                          }`}
                      >
                        <input type="text" id={`search-${group}`} placeholder="Search..." value={searchValue}
                          onChange={(e) => {
                            handleTestSearchChange(group, e.target.value)
                          }}
                          className="p-1 border-2 border-blue-600 rounded w-full mb-2 outline-0"
                        />

                        {
                          (filtered_Items.length === 0) && searchValue.trim() !== "" ? (
                            <div className="text-white text-sm">No results found</div>
                          ) :
                            (filtered_Items.length === 0) ? (
                              <div
                                className={`${Object.keys(selectedTests).length > 1
                                  ? "max-h-64 overflow-y-auto bg-slate-300"
                                  : ""
                                  } border-2 border-blue-600 rounded-md p-2 bg-white`}
                              >
                                {Object.keys(selectedTests[group].subTests).map((sub) => (
                                  <div key={sub} className="flex items-center space-x-2">
                                    {console.log("selectedTests[group].subTests", selectedTests[group].subTests)}
                                    <input
                                      type="checkbox"
                                      checked={selectedTests[group].subTests[sub]}
                                      onChange={(e) =>
                                        handleSubTestChange(group, sub, e.target.checked)
                                      }
                                      className="rounded-md"
                                    />
                                    <span>{sub}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div
                                className={`${Object.keys(selectedTests).length > 1
                                  ? "max-h-32 overflow-y-auto"
                                  : ""
                                  } border rounded-md p-2`}
                              >
                                {(filtered_Items).map((data, key) => (
                                  <div key={key} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      name={data}
                                      checked={selectedTests[group].subTests[data]}
                                      onChange={(e) =>
                                        handleSubTestChange(group, data, e.target.checked)
                                      }
                                      className="rounded-md outline-0"
                                    />
                                    <label className="text-sm">{data}</label>
                                  </div>
                                ))}
                              </div>
                            )
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
              }
            </div>
            <div className="p-2">
              <div className="">
                <label className="block text-sm font-semibold mb-2">Remarks</label>
                <input
                  type="text"
                  name="Remarks"
                  className="w-full border-2 border-blue-600 rounded-md p-2 outline-0"
                  required
                  placeholder="Enter Remarks..."
                />
              </div>
            </div>
        </div>
  

        {/* Submit Button */}
        <div className="mb-24 mt-10">
          <center>
            <button type="submit" className="w-1/2 bg-indigo-700 text-lg text-white py-2 rounded-md hover:bg-indigo-800">
              Submit
            </button>
          </center>
        </div>
      </form>
    </>
  );
};

export default Register;




