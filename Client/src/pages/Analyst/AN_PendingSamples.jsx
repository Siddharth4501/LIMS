import React,{ useEffect,useState }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTMANData,getSampleData } from '../../Redux/Slices/SampleSlice'
import { useNavigate } from 'react-router-dom';

const AN_PendingSamples = () => {
  const { TmAnData,sampleData }=useSelector((state)=>state.sample)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [userFound,setUserFound]=useState(false);
  useEffect(() => {
      (async () => {
      await dispatch(getTMANData());
      await dispatch(getSampleData());
      })();
  }, []);
  console.log(TmAnData,sampleData);
  const userData=JSON.parse(localStorage.getItem("userData"));
  const [assignedGroups,setAssignedGroups]=useState([])
  console.log(userData,"yyy")
  useEffect(()=>{
    const userGroup=[]
    userData?.roles.map((item)=>{
      if(item.designation==='Analyst'){
        console.log(item.Assigned_Group,"uit")
        item.Assigned_Group.map((data)=>{
          userGroup.push(data)
        })
        
      }
    })
    setAssignedGroups(userGroup);
  },[])
  // It Determines userFound
  useEffect(() => {
    const found = TmAnData?.filter((data)=>data.TM_Status==='Pending At Analyst').some((item) => {
      const userObj = item.AN_Status.find((analyst) => analyst.Analyst.ID === userData?._id);
      const filteredSample = sampleData?.filter(
        (data) => data._id === item.Sample_Alloted && assignedGroups.includes(data.Group) && userObj
      );
      return filteredSample?.length > 0;
    });
    setUserFound(found);
  }, [TmAnData, sampleData, userData, assignedGroups]);

  console.log("lala",assignedGroups);
  const handleNavigation=(data,filteredSample,TMANID)=>{
    navigate("/AN_PendingSample/ViewMore",{state:{...data,...filteredSample,TMANID}})
  }
  return (
    <div>
      <div className='w-full flex border bg-gray-300 p-5'>
        <div className='w-2/3 text-3xl font-bold'><span className='float-right'>Pending Sample Page For Analyst</span></div>
        <div className='w-1/3'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Analyst/Home')}>Back</button></div>
      </div>
      <br /><br />
    {
      userFound==true?
      (

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
              TmAnData?.filter((data)=>data.TM_Status === 'Pending At Analyst').map((item,index)=>{
                let userObj=item.AN_Status.find((analyst)=>analyst.Analyst.ID=== userData?._id)
                let filteredSample=sampleData?.filter((data)=>data._id== item.Sample_Alloted && assignedGroups.includes(data.Group) && userObj)
                if(filteredSample.length===0){
                  return null;
                }
                else{
                  {console.log(filteredSample,"kiuku",userObj)}
                  return(
                    <tr className="hover:bg-gray-100" key={item._id}>
                      <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{filteredSample[0]?.Registration_Number}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{filteredSample[0]?.Name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item.Due_Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{filteredSample[0]?.Storage_Conditions}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{filteredSample[0]?.Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item.TM_Status}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-900' onClick={()=>handleNavigation(item,filteredSample[0],item._id)}>View</button></td>
                    </tr>
                  )
                }
                })
              }
              
          </tbody>
        </table>
      </div>
        ):
        (
          <div className='text-xl font-semibold text-center w-full h-[48vh] translate-y-3/4 text-gray-600'>
            No Pending Samples Yet!!
          </div>
        )
      }
    </div>
  )
}

export default AN_PendingSamples