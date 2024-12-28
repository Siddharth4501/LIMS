import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const FullHistory = () => {
    const {state}=useLocation();//gets value througn data passes from previous component as second parameter of navigate hook
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

  console.log('poqwetcn',state.Tests)
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
    const Date = e.target[6].value;
    const Treatment_Type = e.target[7].value
    const Remarks = e.target[8].value
    const Group = e.target[9].value
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
    console.log(Name, Quantity, Storage_Condititons, Registration_Number, Customer_Code, Packing_Type, Date, Treatment_Type, Remarks, Group, selectedAnalysis, selectedTests, "jjj")
    const data={
      "Name":Name,
      "Quantity":Quantity,
      "Storage_Conditions":Storage_Condititons,
      "Registration_Number":Registration_Number,
      "Customer_Code":Customer_Code,
      "Packing_Type":Packing_Type,
      "Date":Date,
      "Treatment_Type":Treatment_Type,
      "Remarks":Remarks,
      "Group":Group,
      "Type_Of_Testing":Type_Of_Testing,
      "Tests":Tests
    }
    const URL = `http://localhost:5001/api/v1/Sample/register`;
    try {
      const response = await axios.post(URL,data);
      if (response) {
        alert('Data sent to Backend');
      }
    } catch (error) {
      console.log("Error", error);
    }
  };


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
    <div  className="space-y-6 max-w-full mx-auto p-6 bg-white">
        <div className="font-bold text-2xl text-center">Full Sample Information</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="Name"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              value={state.Name}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="text"
              name="Quantity"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              value={state.Quantity}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Storage Conditions</label>
            <input
              type="number"
              name="Storage_Conditions"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              value={state.Storage_Conditions}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Registration Number</label>
            <input
              type="number"
              name="Registration_Number"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              value={state.Registration_Number}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Code</label>
            <input
              type="number"
              name="Customer_Code"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              value={state.Customer_Code}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Packing Type</label>
            <select
              name="Packing_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              required
            >
              <option value={state.Packing_Type}>{state.Packing_Type}</option>
              
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="Date"
              name="Date"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              value={state.Date.split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Treatment Type</label>
            <input
              type="text"
              name="Treatment_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              value={state.Treatment_Type}
            />
          </div>
          <div>
          <label className="block text-sm font-semibold mb-2">Remarks</label>
          <input
            type="text"
            name="Remarks"
            className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            value={state.Remarks}
          />
          </div>
        </div>
        <div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          
          <div >
          
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Group</label>
              <select
                name="Group"
                className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              >
                <option value={state.Group}>{state.Group}</option>
              </select>
            </div>
            <div className="pt-2">
              <h2 className="text-sm font-semibold mb-2">Type of Testing</h2>

              <div className=''> 
                {
                    state.Type_Of_Testing.map((item,index)=>{
                        return (
                            <div className='flex flex-col bg-slate-100'>
                                <div className='font-semibold pl-2'>
                                    {index+1}.{item}
                                </div>
                            </div>
                        )
                    })
                }  
              </div>

            </div>
          </div>
          
          <div className="">
            <h2 className="text-sm font-semibold mb-2">Tests</h2>
            
            {
                state.Tests.map((item,index)=>{
                    return (
                        <div className='flex flex-col font-semibold bg-slate-100 pl-2'>
                            <div>{index+1}.{item.Test}</div>
                        </div>
                    )
                })
            }
            
          </div>
      
        </div>
      </div>
  );
};



export default FullHistory