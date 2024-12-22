
import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchFeature from "./SearchFeature";

const Register = () => {
  const [groups, setGroup] = useState([])
  const [choosenGroup, setChoosenGroup] = useState('');
  const [analysisData, setAnalysisData] = useState([]);
  const [testData, setTestData] = useState([])
  // For search
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const filtered = analysisData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);

  const getGroupData = async () => {

    const URL = 'http://localhost:5001/api/v1/Group/data';
    try {
      const groups = await axios.get(URL);
      if (groups) {
        console.log('Data fetched', groups, groups.data.group);
        setGroup(groups.data.group);

      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => { getGroupData() }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const Name = e.target[0].value
    const Quantity = e.target[1].value
    const Storage_Condititons = e.target[2].value
    const Registration_Number = e.target[3].value
    const Customer_Code = e.target[4].value
    const Packing_Type = e.target[5].value
    const Group = e.target[6].value
    console.log(Name, Quantity, Storage_Condititons, Registration_Number, Customer_Code, Packing_Type, Group, selectedAnalysis, selectedTests, "jjj")
    const URL = `${BACKEND_URL}/api/v1/Sample/register`;
    try {
      const response = await axios.post(URL);
      if (response) {
        alert('Data sent to Backend');
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (choosenGroup != '') {
      const filteredGroup = groups.filter((group) => { return group.Group_Name === choosenGroup });
      if (filteredGroup) {
        setAnalysisData(filteredGroup[0].Type_Of_Testing);
        const data = [];
        console.log("ppp", data)
        filteredGroup[0].Tests.map((item) => {
          console.log(item, "qqq")
          if (data.length > 0) {
            data.forEach(obj => {
              if (obj.name == item.Type_Of_Testing) {
                obj.subTests.push(item.Test)
                console.log(data, "kk")
              }
              else {
                const name = item.Type_Of_Testing
                const subTests = [item.Test]
                console.log(name, subTests, "ooo")
                const obj = {
                  name: name,
                  subTests: subTests
                };
                data.push(obj)

              }
            })
          }
          else {
            const name = item.Type_Of_Testing
            const subTests = [item.Test]
            console.log(name, subTests, "ooo0")
            const obj = {
              name: name,
              subTests: subTests
            };
            data.push(obj)
          }
          console.log(data, "siddd")

        })
        setTestData(data)
        console.log(filteredGroup[0].Type_Of_Testing, "ddjdjjw")

      }

    }
  }, [choosenGroup])

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
    setFilteredItems = [];

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
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6 bg-gray-600">
        <div className="font-bold text-2xl">Sample Registration Form</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="Name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="text"
              name="Quantity"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Storage Conditions</label>
            <input
              type="number"
              name="Storage_Conditions"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Registration Number</label>
            <input
              type="number"
              name="Registration_Number"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Code</label>
            <input
              type="number"
              name="Customer_Code"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Packing Type</label>
            <select
              name="Packing_Type"
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="SEALED">SEALED</option>
              <option value="UNSEALED">UNSEALED</option>
            </select>
          </div>
        </div>

        {/* Group Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2">Group</label>
          <select
            name="Group"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => groupFunction(e.target.value)}
          >
            <option value="Select">Select</option>
            {
              groups.map((group, key) => {
                return <option id={key} value={group.Group_Name}>{group.Group_Name}</option>
              })
            }


          </select>
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
        <div className="space-y-4">
          <h2 className="font-bold text-xl mb-2">Type of Testing</h2>

          <div className='p-4'>
            <input type="text" placeholder="Search..." value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-1 border border-gray-300 rounded w-full mb-2"
            />
            {
              !(filteredItems.length) > 0 ? (
                // <div key={index}>{item}</div>
                <div
                  className={`${Object.keys(selectedAnalysis).length > 3
                    ? "overflow-y-auto"
                    : ""
                    } border rounded-md p-2`}
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
                      ? "overflow-y-auto"
                      : ""
                      } border rounded-md p-2`}
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








        {/* Test to be Done */}
        <div className="space-y-4">
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
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;




