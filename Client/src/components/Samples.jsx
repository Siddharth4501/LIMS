import React from 'react';
import { useNavigate } from 'react-router-dom';


const Samples = ({data}) => {
    const navigate=useNavigate();
    const handleViewMore=()=>{
        navigate('/SampleAllotment/View_More',{state:{...data}})
      }
  return (
          
          <tbody>
              <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Registration_Number}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">12345</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Storage_Conditions}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Date.split('T')[0]}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">                 
                <button className="text-indigo-500 hover:text-indigo-700 underline" onClick={handleViewMore}>View </button>
              </td>
            </tr>
          </tbody>
  )
}

export default Samples
