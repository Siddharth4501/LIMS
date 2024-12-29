import React from 'react';
import { useNavigate } from 'react-router-dom';


const Samples = ({difference,data,index}) => {
    const navigate=useNavigate();
    const handleRedirection=()=>{
        if(difference==='All Sample History'){
          navigate('/AllSampleHistory/View_More',{state:{...data}})
        }
        else{
          navigate('/SampleAllotment/View_More',{state:{...data}})
        }
        
      }
  return (
          
          <tbody>
              <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Registration_Number}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Group}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{data.Date.split('T')[0]}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">                 
                <button className="bg-indigo-700 hover:bg-indigo-900 rounded-md text-white pl-4 pr-4 pt-1 pb-1" onClick={handleRedirection}>View </button>
              </td>
            </tr>
          </tbody>
  )
}

export default Samples
