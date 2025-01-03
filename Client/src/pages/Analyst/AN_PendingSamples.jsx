import React,{ useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTMANData,getSampleData } from '../../Redux/Slices/SampleSlice'
import { useNavigate } from 'react-router-dom';

const AN_PendingSamples = () => {
  const { TmAnData,sampleData }=useSelector((state)=>state.sample)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
      (async () => {
      await dispatch(getTMANData());
      await dispatch(getSampleData());
      })();
  }, []);
  console.log(TmAnData,sampleData);
  const handleNavigation=(data,fliteredSample)=>{
    navigate("/AN_PendingSample/ViewMore",{state:{...data,...fliteredSample}})
  }
  return (
    <div>
      <div className='w-screen text-center pt-2 text-3xl font-bold'>Pending Samples</div>
      <br /><br />
      <div>
        <table className='table-auto w-full border-collapse border border-gray-300'>
          <thead>
            <tr className="bg-slate-200">
                <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Registration No.</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Due Date</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Storage Condition</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Registration Date</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
            </tr>
          </thead>
          <tbody>
            {
              TmAnData?.map((item,index)=>{
                let fliteredSample=sampleData?.filter((data)=>data._id== item.Sample_Alloted)
                if(!fliteredSample){
                  return null;
                }
                {console.log(fliteredSample)}
                return(
                  <tr className="hover:bg-gray-100" key={item._id}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{fliteredSample[0]?.Registration_Number}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{fliteredSample[0]?.Name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.Due_Date.split('T')[0]}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{fliteredSample[0]?.Storage_Conditions}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{fliteredSample[0]?.Date.split('T')[0]}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.TM_Status}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-900' onClick={()=>handleNavigation(item,fliteredSample[0])}>View</button></td>
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

export default AN_PendingSamples