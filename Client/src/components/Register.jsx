
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { getGroupData } from "../Redux/Slices/GroupSilce";
import { registerSample } from "../Redux/Slices/SampleSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { groupData } = useSelector((state) => state.group);
  console.log("mrsfnejgojrioejg",groupData)
  const userData =JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    (async () => {
      await dispatch(getGroupData());
    })();
  }, []);
  
  const [groups, setGroup] = useState([])
  const [choosenGroup, setChoosenGroup] = useState('');
  const [analysisData, setAnalysisData] = useState([]);
  const [testData, setTestData] = useState([])

  useEffect(()=>{
    setGroup(groupData)
  },[groupData])

  // For search
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const filtered = analysisData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);


  const [testSearch, setTestSearch] = useState({});
  const [filteredTestItems, setFilteredTestItems] = useState({});
  // useEffect(() => {
  //   if(choosenGroup !=''){
  //     const filteredGroup = groups.find((group) => group.Group_Name === choosenGroup);
  //     console.log(filteredGroup,"twada")
  //     if(filteredGroup){
  //       const subTestValue = [];
  //       filteredGroup.Tests.map((item) => {
  //         console.log("item", item)
  //         subTestValue.push(item.Test)
  //       })
  //       console.log("subTestValue", subTestValue)
  //       const filteredTest = subTestValue.filter(item =>
  //         item.toLowerCase().includes(testSearch?.toLowerCase())
  //       );
  //       setFilteredTestItems(filteredTest);
  //     }
  //   }
  // }, [testSearch]);
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
    const Name = e.target[0].value
    const Quantity = e.target[1].value
    const Storage_Condititons = e.target[2].value
    const Registration_Number = e.target[3].value
    const Customer_Code = e.target[4].value
    const Packing_Type = e.target[5].value
    const Date = e.target[6].value;
    const Treatment_Type = e.target[7].value
    const Nature_Of_Sample = e.target[8].value
    const Remarks=e.target[9].value
    const Group = e.target[10].value
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
    console.log(Name, Quantity, Storage_Condititons, Registration_Number, Customer_Code, Packing_Type, Date, Treatment_Type,Nature_Of_Sample, Remarks, Group, selectedAnalysis, selectedTests, "jjj")
    const data={
      "Name":Name,
      "Quantity":Quantity,
      "Storage_Conditions":Storage_Condititons,
      "Registration_Number":Registration_Number,
      "Customer_Code":Customer_Code,
      "Packing_Type":Packing_Type,
      "Date":Date,
      "Treatment_Type":Treatment_Type,
      "Nature_Of_Sample":Nature_Of_Sample,
      "Remarks":Remarks,
      "Group":Group,
      "Type_Of_Testing":Type_Of_Testing,
      "Tests":Tests,
      "ID":userData._id
    }
    try {
      const response = await dispatch(registerSample(data));
      if (response) {
        toast.success('Sample Registered Successfully');
        navigate('/UserInterface/SampleRegisterOptions')
      }
    } catch (error) {
        toast.error(error)
    }
  };

  // useEffect(() => {
  //   if (choosenGroup != '') {
  //     const filteredGroup = groups.filter((group) => { return group.Group_Name === choosenGroup });
  //     if (filteredGroup) {
  //       setAnalysisData(filteredGroup[0].Type_Of_Testing);
  //       const data = [];
  //       console.log("ppp", data)
  //       filteredGroup[0].Tests.map((item) => {
  //         console.log(item, "qqq")
  //         if (data.length > 0) {
  //           data.forEach(obj => {
  //             if (obj.name == item.Type_Of_Testing) {
  //               obj.subTests.push(item.Test)
  //               console.log(data, "kk")
  //             }
  //             else {
  //               const name = item.Type_Of_Testing
  //               const subTests = [item.Test]
  //               console.log(name, subTests, "ooo")
  //               const obj = {
  //                 name: name,
  //                 subTests: subTests
  //               };
  //               data.push(obj)

  //             }
  //           })
  //         }
  //         else {
  //           const name = item.Type_Of_Testing
  //           const subTests = [item.Test]
  //           console.log(name, subTests, "ooo0")
  //           const obj = {
  //             name: name,
  //             subTests: subTests
  //           };
  //           data.push(obj)
  //         }
  //         console.log(data, "siddd")

  //       })
  //       setTestData(data)
  //       console.log(filteredGroup[0].Type_Of_Testing, "ddjdjjw")

  //     }

  //   }
  // }, [choosenGroup])

  useEffect(() => {
    if (choosenGroup !== '') {
      const filteredGroup = groups.find((group) => group.Group_Name === choosenGroup);
      if (filteredGroup) {
        setAnalysisData(filteredGroup.Type_Of_Testing);

        const data = [];
        filteredGroup.Tests.forEach((item) => {
          // Check if the object for this Type_Of_Testing already exists
          const existingObj = data.find((obj) => obj.name === item.Type_Of_Testing);

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

        setTestData(data);
      }
    }
  }, [choosenGroup]);

  console.log(analysisData, "rrr")



  const initialStateOfAnanlysis = analysisData?.reduce((acc, key) => {
    acc[key] = false; // Set default value (false) for each key
    return acc;
  }, {});

  const [selectedAnalysis, setSelectedAnalysis] = useState([]);

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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-full mx-auto p-6 bg-white">
        <div className="font-bold text-2xl text-center">Sample Registration Form</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="Name"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="text"
              name="Quantity"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Storage Conditions(in ℃)</label>
            <input
              type="number"
              name="Storage_Conditions"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Registration Number</label>
            <input
              type="number"
              name="Registration_Number"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Code</label>
            <input
              type="number"
              name="Customer_Code"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Packing Type</label>
            <select
              name="Packing_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            >
              <option value="SEALED">SEALED</option>
              <option value="UNSEALED">UNSEALED</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="Date"
              name="Date"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Treatment Type</label>
            <input
              type="text"
              name="Treatment_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            />
          </div>
          <div>
          <label className="block text-sm font-semibold mb-2">Nature Of Sample</label>
          <input
            type="text"
            name="Nature_Of_Sample"
            className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            required
          />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Remarks</label>
          <input
            type="text"
            name="Remarks"
            className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            required
          />
        </div>
        <div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        // className="grid grid-cols-2 gap-4"
        >
          
          <div 
          // className="grid grid-rows-2"
          >
            {/* Group Selection */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Group</label>
              <select
                name="Group"
                className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
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
            <div className="pt-2">
              <h2 className="text-sm font-semibold mb-2">Type of Testing</h2>

              <div className={`${choosenGroup!=''?'p-4':'bg-slate-100 border rounded-md'}`}>
                {
                  choosenGroup!=''?
                    <input type="text" placeholder="Search..." value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-1 border border-gray-300 bg-slate-100 rounded w-full"
                    />
                    :<div className="">
                      <select name="" id="" className="w-full border border-gray-300 bg-slate-100 rounded-md p-2">
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
                          ? "max-h-32 overflow-y-auto bg-slate-300"
                          : ""
                          }`}
                      >
                        {Object.keys(selectedAnalysis).map((key) => (
                          <div key={key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name={key}
                              checked={selectedAnalysis[key]}
                              onChange={handleAnalysisChange}
                              className="rounded-md"
                            />
                            <label className="text-sm">{key}</label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className={`${Object.keys(selectedAnalysis).length > 3
                          ? "max-h-32 overflow-y-auto"
                          : ""
                          } border rounded-md p-2 bg-slate-300`}
                      >
                        {(filteredItems).map((data, key) => (
                          <div key={key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name={data}
                              checked={selectedAnalysis[data]}
                              onChange={handleAnalysisChange}
                              className="rounded-md"
                            />
                            <label className="text-sm">{data}</label>
                          </div>
                        ))}
                      </div>
                    )
                }

                
              </div>

            </div>
          </div>
          
          <div className="">
            <h2 className="text-sm font-semibold mb-2">Tests</h2>
            {
              choosenGroup==''?(
                <div className="w-full">
                  <select name="" id="" className="w-full border border-gray-300 bg-slate-100 rounded-md p-2">
                    <option value="Select" className="">Select</option>
                  </select>
                </div>
              )
            :
            <div
              className={` p-2 ${Object.keys(selectedTests).filter((group) => selectedAnalysis[group])
                .length > 1
                ? "max-h-64 overflow-y-auto"
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
                          className="rounded-md"
                        />
                        <span>{group}</span>
                      </div>
                    </div>


                    <div
                      className={`ml-6 border rounded-md p-2 ${Object.keys(selectedTests[group].subTests).length > 1
                        ? "max-h-32 overflow-y-auto"
                        : ""
                        }`}
                    >
                      <input type="text" id={`search-${group}`} placeholder="Search..." value={searchValue}
                        onChange={(e) => {
                          handleTestSearchChange(group, e.target.value)
                          // if(e.target.value.length>0){setTestSearch(e.target.value)}
                          // else if(e.target.value.length==0){setFilteredTestItems([]);setTestSearch()}
                        }}
                        className="p-1 border border-gray-300 bg-slate-100 rounded w-full mb-2"
                      />
                      {/* {Object.keys(selectedTests[group].subTests).map((sub) => (
                        <div key={sub} className="flex items-center space-x-2">
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
                      ))} */}

                      {
                        (filtered_Items.length === 0) && searchValue.trim() !== "" ? (
                          <div className="text-white text-sm">No results found</div>
                        ) :
                          (filtered_Items.length === 0) ? (
                            <div
                              className={`${Object.keys(selectedTests).length > 1
                                ? "max-h-32 overflow-y-auto bg-slate-300"
                                : ""
                                } border rounded-md p-2 bg-white`}
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
                                } border rounded-md p-2 bg-slate-300`}
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
                                    className="rounded-md"
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
      
        </div>
        

        {/* Type of Analysis */}
        {/* <div className="space-y-4">
        <h2 className="font-bold text-xl mb-2">Type of Testing</h2>
        {Object.keys(selectedAnalysis).map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={key}
              checked={selectedAnalysis[key]}
              onChange={handleAnalysisChange}
              className="rounded-md"
            />
            <label className="text-sm">{key}</label>
          </div>
        ))}
      </div> */}
      
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      </div> */}






          {/* Test to be Done */}
          {/* <div className="space-y-4">
            <h2 className="font-bold text-xl mb-2">Test</h2>
            {Object.keys(selectedTests).map((group) => {
              if (!selectedAnalysis[group]) return null;

              return (
                <div key={group} className="space-y-2">
                  <div className="font-bold text-lg">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTests[group].isChecked}
                        onChange={(e) => handleGroupTestChange(group, e.target.checked)}
                        className="rounded-md"
                      />
                      <span>{group}</span>
                    </div>
                  </div>

                  <div className="ml-6 space-y-2">
                    {Object.keys(selectedTests[group].subTests).map((sub) => (
                      <div key={sub} className="flex items-center space-x-2">
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
                </div>
              );
            })}
          </div> */}
      
        

        {/* Submit Button */}
        <div className="">
          <center>
            <button type="submit" className="w-1/2 bg-indigo-500 text-white py-2 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </center>
        </div>
      </form>
    </>
  );
};

export default Register;




