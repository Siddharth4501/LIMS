import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  BsTrash } from "react-icons/bs";

const Samples = ({difference,data,index}) => {
    const navigate=useNavigate();
    const handleRedirection=()=>{
        if(difference==='All Sample History'){
          navigate('/Admin/Sample/AllSampleHistory/View_More',{state:{...data,difference}})
        }
        else if(difference==='ParticularUser Sample History'){
          navigate('/SampleRegistrationUser/SampleHistory/View_More',{state:{...data,difference}})
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
              {
                difference==='All Sample History' || difference=== 'ParticularUser Sample History' ?(
                  <td className="border border-gray-300 px-4 py-2 text-center">                 
                    <button className="bg-red-700 hover:bg-red-800 rounded-md text-white pl-4 pr-4 pt-1 pb-1"><BsTrash/></button>
                  </td>
                ):(
                  <span className='w-0'></span>
                )
              }
            </tr>
          </tbody>
  )
}

export default Samples
