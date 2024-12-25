import React, { useEffect, useState } from 'react';
import Samples from '../../components/Samples';
import axios from 'axios';

const TM_SampleAllotment = () => {
  
  const[samples,setSamples]=useState([]);
  useEffect(()=>{
    async function getSampleData(){
      const URL='http://localhost:5001/api/v1/Sample/data'
      const sampleData=await axios.get(URL)
      if (sampleData) {
        console.log("sampleData",sampleData)
        setSamples(sampleData.data.samples);
      }
      else{
        console.log("error",error);
      }
    }
    getSampleData();
  },[])
  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold mt-8 mb-6">Sample Allotment</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Reg. No.</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Storage Condition</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Registered Date</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Expand
                  {/* <button className="text-blue-500 hover:text-blue-700 underline">Expand &gt;&gt; </button> */}
              </th>
            </tr>
          </thead>
        {
          samples?.map((element)=>{
            return <Samples key={element._id} data={element}/>
          })
        }
        </table>

    </div>
  );
};

export default TM_SampleAllotment;
