import React from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'

const TM_RAResultStatus = () => {
    const {state}=useLocation();
    const navigate=useNavigate();
    const handleNavigation=(TMANSAMPdata,analystClicked)=>{
        navigate("/ResultApproval/Result_Status/View_More",{state:{...TMANSAMPdata,analystClicked}})
      }
  return (
    <div>
      <div className='w-full flex border bg-gray-300 p-5'>
            <div className='w-3/5 text-3xl font-bold'><span className='float-right'>TM Result Status Page</span></div>
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/ResultApproval')}>Back</button></div>
        </div>
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
                  <tr className="hover:bg-gray-100" key={item.Analyst.ID}>
                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index+1}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Analyst.Name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Analyst.ID}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Status}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{
                      item.Status==='Approved By TM'?<span className='text-sm font-bold text-green-500'>Approved</span>:item.Status==='Pending At Analyst'?<button className='bg-gray-400 text-white px-4 py-1 rounded-md cursor-not-allowed' disabled={true}>View</button>:
                      <button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-900' onClick={()=>handleNavigation(state,item)}>View</button>
                      }
                    </td>

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