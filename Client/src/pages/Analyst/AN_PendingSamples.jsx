import React,{ useEffect,useState }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTMANData,getSampleData, uploadFile } from '../../Redux/Slices/SampleSlice'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import UserCommonNav from '../../components/UserCommonNav';

const AN_PendingSamples = () => {
  const { TmAnData,sampleData }=useSelector((state)=>state.sample)
  const [file, setFile] = useState(null);
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
  }, [TmAnData, sampleData, userData, assignedGroups,TmAnDataState,sampleDataState,found]);

  console.log("lala",assignedGroups);
  const handleNavigation=(data,filteredSample,TMANID)=>{
    navigate("/AN_PendingSample/ViewMore",{state:{...data,...filteredSample,TMANID}})
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = async (sampleID) => {
    if (!file) return toast.error("Please select an image");
    const formData = new FormData();
    formData.append("sampleDetailsFile", file);
    formData.append("sampleID", sampleID);
    formData.append("AnalystName", userData?.fullName);
    formData.append("AnalystID", userData?._id);
    try {
        const res = await dispatch(uploadFile(formData));
        if(res?.payload?.success){
          toast.success("Upload Successful")
          navigate('/AN_PendingSamples');
        }
    } catch (err) {
        toast.error("Upload failed");
    }
  };
  let indexsCounter=1;
  return (
    <div>
      <UserCommonNav assignedRole='Analyst'/>
      <div className='w-full flex p-5'>
        <div className='w-full'><button className='bg-indigo-700 px-8 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Analyst/Home')}>Back</button></div>
      </div>
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
                <th className="border border-gray-300 px-4 py-2 text-center">Storage Condition(in ℃)</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Registration Date</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Upload File</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
            </tr>
          </thead>
          <tbody>
            {
              TmAnDataState?.map((item,index)=>{
                let userObj=item.AN_Status.find((analyst)=>analyst.Analyst?.ID=== userData?._id && analyst.Status==='Pending At Analyst')
                let filteredSample=sampleDataState?.filter((data)=>data._id== item.Sample_Alloted && data.Active===true && assignedGroups.includes(data.Group) && userObj)
                if(filteredSample.length===0){
                  return null;
                }
                else{
                  {console.log(filteredSample,"kiuku",userObj)}
                  const currentIndex = indexsCounter++;
                  return(
                    <tr className="hover:bg-gray-100" key={`${item._id}-${index}`}>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Registration_Number}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Due_Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Storage_Conditions}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{filteredSample[0]?.Date.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.TM_Status}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">
                        <input type="file" name={`name-sampleDetailsFile-${item._id}`} id="sampleDetailsFile" className='w-full border-2 mb-1 p-1' onChange={(e)=>handleFileChange(e)}/>
                        <button className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-900' onClick={()=>handleFileUpload(filteredSample[0]?._id)}>Submit</button>
                        {/* {
                          filteredSample[0]?.Upload_File ? <span className='text-green-600 font-semibold text:sm pl-1 ml-1'>Uploaded</span> : ''
                        } */}
                      </td>
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
          <div className='text-2xl font-semibold text-center w-full h-[48vh] translate-y-1/2 text-gray-800'>
            No Pending Samples Yet!!
          </div>
        )
      }
    </div>
  )
}

export default AN_PendingSamples