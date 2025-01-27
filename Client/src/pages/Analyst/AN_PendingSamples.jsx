import React,{ useEffect,useState }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTMANData,getSampleData } from '../../Redux/Slices/SampleSlice'
import { useNavigate } from 'react-router-dom';

const AN_PendingSamples = () => {
  const { TmAnData,sampleData }=useSelector((state)=>state.sample)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [found,setFound]=useState(false);
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
  const [TmAnDataState,setTmAnDataState]=useState([]);
  const [sampleDataState,setSampleDataState]=useState([])
    useEffect(() => {
        setTmAnDataState(TmAnData);
      },[TmAnData])
  
    useEffect(() => {
      setSampleDataState(sampleData);
    },[sampleData])
  // It Determines userFound
  useEffect(() => {
    const found = TmAnDataState?.some((item) => {
      const userObj = item.AN_Status.find((analyst) => analyst.Analyst.ID === userData?._id && analyst.Status==='Pending At Analyst');
      const filteredSample = sampleDataState?.filter(
        (data) => data._id === item.Sample_Alloted && data.Active===true && assignedGroups.includes(data.Group) && userObj
      );
      return filteredSample?.length > 0;
    });
    setFound(found);
  }, [TmAnData, sampleData, userData, assignedGroups,TmAnDataState,sampleDataState]);

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
      found===true?
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
              TmAnDataState?.map((item,index)=>{
                let userObj=item.AN_Status.find((analyst)=>analyst.Analyst.ID=== userData?._id && analyst.Status==='Pending At Analyst')
                let filteredSample=sampleDataState?.filter((data)=>data._id== item.Sample_Alloted && data.Active===true && assignedGroups.includes(data.Group) && userObj)
                if(filteredSample.length===0){
                  return null;
                }
                else{
                  {console.log(filteredSample,"kiuku",userObj)}
                  return(
                    <tr className="hover:bg-gray-100" key={item._id}>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index+1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Registration_Number}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Due_Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Storage_Conditions}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.TM_Status}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-900' onClick={()=>handleNavigation(item,filteredSample[0],item._id)}>View</button></td>
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
          <div className='text-2xl font-semibold text-center w-full h-[48vh] translate-y-3/4 text-gray-600'>
            No Pending Samples Yet!!
          </div>
        )
      }
    </div>
  )
}

export default AN_PendingSamples