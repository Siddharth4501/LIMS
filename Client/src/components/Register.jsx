
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${BACKEND_URL}/api/v1/SampleRegister`;
    try {
      const response = await axios.post(URL);
      if (response) {
        alert('Data sent to Backend');
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const [selectedAnalysis, setSelectedAnalysis] = useState({
    Proximate: false,
    Vitamins: false,
    Mineral: false,
  });

  const [selectedTests, setSelectedTests] = useState({
    Proximate: { isChecked: false, subTests: { Protein: false, Fibre: false } },
    Vitamins: { isChecked: false, subTests: { B12: false, B6: false, B2: false } },
    Mineral: { isChecked: false, subTests: { Iron: false, Calcium: false } },
  });

  // Handle "Type of Analysis" section
  const handleAnalysisChange = (e) => {
    const { name, checked } = e.target;
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6">
      
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
        >
          <option value="CHEMICAL">CHEMICAL</option>
          <option value="BIOLOGICAL">BIOLOGICAL</option>
          <option value="MECHANICAL">MECHANICAL</option>
        </select>
      </div>

      {/* Type of Analysis */}
      <div className="space-y-4">
        <h2 className="font-bold text-xl mb-2">Type of Analysis</h2>
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
  );
};

export default Register;




