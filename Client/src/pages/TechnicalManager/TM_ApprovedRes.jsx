import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getSampleData, getTMANData } from '../../Redux/Slices/SampleSlice';
import UserCommonNav from '../../components/UserCommonNav';

const TM_ApprovedRes = () => {
  const { TmAnData,sampleData }=useSelector((state)=>state.sample)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=JSON.parse(localStorage.getItem("userData"));
  const [assignedGroups,setAssignedGroups]=useState([])
  console.log(userData,"yyy")
  useEffect(()=>{
    const userGroup=[]
    userData?.roles.map((item)=>{
      if(item.designation==='Technical Manager'){
        console.log(item.Assigned_Group,"uit")
        item.Assigned_Group.map((data)=>{
          userGroup.push(data)
        })
        
      }
    })
    setAssignedGroups(userGroup);
  },[])
  console.log("lala",assignedGroups);
  useEffect(() => {
      (async () => {
      await dispatch(getTMANData());
      await dispatch(getSampleData());
      })();
  }, []);
  console.log(TmAnData,sampleData)
  const [TmAnDataState,setTmAnDataState]=useState([]);
  const [sampleDataState,setSampleDataState]=useState([])
    useEffect(() => {
        setTmAnDataState(TmAnData);
      },[TmAnData])
  
    useEffect(() => {
      setSampleDataState(sampleData);
    },[sampleData])
  const [found,setFound]=useState(false)
  useEffect(()=>{
    TmAnDataState?.filter((data)=>data.TM_Status === 'Approved By TM').map((item)=>{
      let filteredSample=sampleDataState?.filter((data)=>data._id== item.Sample_Alloted && data.Active===true && assignedGroups.includes(data.Group))
      if(filteredSample.length>0){
        setFound(true);
      }
    })
  },[TmAnData,sampleData,userData,TmAnDataState,sampleDataState,found])
  const handleNavigation=(data)=>{
    const difference="Completed Samples For TM"
    navigate('/ResultApproved/View_More',{state:{...data,difference}})
  }
  return (
    <div>
      <UserCommonNav assignedRole='Technical Manager'/>
      <div className='w-full flex p-5'>
          <div className='w-full'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Technical Manager/Home')}>Back</button></div>
      </div>
      {
        found?(

      <div>
        <table className='table-auto w-full border-collapse border border-gray-300'>
          <thead>
            <tr className="bg-slate-200">
                <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Registration No.</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Registration Date</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Sample Name</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Customer Code</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Due Date</th>   
                <th className="border border-gray-300 px-4 py-2 text-center">Completion Date</th>              
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
            </tr>
          </thead>
          <tbody>
            {
              TmAnDataState?.filter((data)=>data.TM_Status === 'Approved By TM').map((item,index)=>{
                let filteredSample=sampleDataState?.filter((data)=>data._id== item.Sample_Alloted && data.Active===true && assignedGroups.includes(data.Group))
                if(filteredSample.length==0){
                  return null;
                }
                else{
                  {console.log(filteredSample,"kiuku")}
                  return(
                    <tr className="hover:bg-gray-100" key={item._id}>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index+1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Registration_Number}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Customer_Code}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Due_Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Completion_Date?.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.TM_Status}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-900' onClick={()=>handleNavigation(filteredSample[0])}>View</button></td>
                    </tr>
                  )
                }
                })
              }
              
          </tbody>
        </table>
      </div>
        ):(
          <div className='text-2xl font-semibold text-center w-full h-[48vh] translate-y-1/2 text-gray-800'>No Approved Results Yet!!!</div>
        )
      }
    </div>
  )
}

export default TM_ApprovedRes
