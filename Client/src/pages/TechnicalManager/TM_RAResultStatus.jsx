import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TM_RAResultStatus = () => {
    const {state}=useLocation();
    const navigate=useNavigate();
    const handleNavigation=(TMANSAMPdata,analystClicked)=>{
        navigate("/ResultApproval/Result_Status/View_More",{state:{...TMANSAMPdata,analystClicked}})
      }
  return (
    <div>
      <div className='w-screen text-center pt-2 text-3xl font-bold'>TM Result Status Page</div>
      <br /><br />
      <div>
        <table className='table-auto w-full border-collapse border border-gray-300'>
          <thead>
            <tr className="bg-slate-200">
                <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Analyst Name</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Analyst ID</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
            </tr>
          </thead>
          <tbody>
            {
              state.AN_Status.map((item,index)=>{ 
                return(
                  <tr className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Analyst.Name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Analyst.ID}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Status}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-900' onClick={()=>handleNavigation(state,item)}>View</button></td>
                  </tr>
                )
                })
              }
              
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TM_RAResultStatus