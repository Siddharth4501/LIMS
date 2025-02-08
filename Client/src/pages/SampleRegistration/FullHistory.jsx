import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllUserData } from '../../Redux/Slices/AuthSlice';
const FullHistory = () => {
    const {allUserData}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {state}=useLocation();//gets value througn data passes from previous component as second parameter of navigate hook
    const [testData,setTestData]=useState([])
    const [allUserDataState, setAllUserDataState] = useState([]);
    const [registrationUser,setRegistrationUser]=useState('');
    useEffect(() => {
      (async () => {
        await dispatch(getAllUserData());
      })();
    }, []);
    useEffect(() => {
        setAllUserDataState(allUserData);
      },[allUserData])

    useEffect(()=>{
      const filteredUser=allUserDataState?.find((user)=>user._id === state.Registered_By)
      if(filteredUser){
        setRegistrationUser(filteredUser?.fullName);
      }
    },[allUserDataState,registrationUser])
    useEffect(()=>{
      let Tests=[];
      state.Tests.map((item)=>{
        const existingObj=Tests.find((data)=>data.Type_Of_Testing === item.Type_Of_Testing)
        if(existingObj){
          existingObj.Tests.push(item.Test)
        }
        else{
          const obj={
            "Type_Of_Testing":item.Type_Of_Testing,
            "Tests":[item.Test]
          }
          Tests.push(obj);
        }
        }
        
      )
      setTestData(Tests)
    },[])
    const handleBackNavigation=()=>{
      console.log("first")
      if(state.difference==='All Sample History'){
        navigate('/Admin/Sample/AllSampleHistory')
      }
      if(state.difference==='All Deleted Sample History'){
        navigate('/Admin/Sample/DeletedSampleHistory')
      }
      else if(state.difference==='ParticularUser Sample History'){
        navigate('/SampleRegistrationUser/SampleHistory')
      }
      else if(state.difference==='Completed Samples For Analyst'){
        navigate('/AN_CompletedSamples')
      }
      else if(state.difference==='Completed Samples For TM'){
        navigate('/ResultApproved')
      }
      
    }
    const handleDownload = (url) => {
      console.log(url, "url");
    
      if (url) {
        const fileUrl = `http://localhost:5001${url}`; // Fixed URL format
    
        // Extracted the file extension dynamically
        const fileExtension = fileUrl.split('.').pop().split('?')[0] || "txt"; // Default to txt if no extension
        const fileName = `AnalysisDetails.${fileExtension}`;
    
        const anchor = document.createElement("a");
        anchor.href = fileUrl;
        anchor.setAttribute("download", fileName);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }
      else{
        toast.error("File Not Uploaded by Analyst Yet");
      }
    };
  return (
    <div  className="space-y-6 max-w-full mx-auto p-6">
        <div className="font-bold text-2xl text-center">Complete Sample Information</div>
        <div className='w-full'><button type="button" className='bg-indigo-700 text-white rounded-md hover:bg-indigo-900 px-8 py-1 float-right' onClick={handleBackNavigation}>Back</button></div>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
              <label className="block text-sm font-semibold mb-2">Registration Number</label>
              <input
                type="text"
                name="Registration_Number"
                className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
                defaultValue={state.Registration_Number}
                disabled={true}
              />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Name</label>
            <input
              type="text"
              name="Issued_To"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Issued_To}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Nature Of Sample</label>
            <input
              type="text"
              name="Nature_Of_Sample"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Nature_Of_Sample}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Sample Name</label>
            <input
              type="text"
              name="Name"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Name}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Registration Date</label>
            <input
              type="text"
              name="Date"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Date.split('T')[0]}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Code</label>
            <input
              type="text"
              name="Customer_Code"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Customer_Code}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Manufacturing Date</label>
            <input
              type="text"
              name="Mfg_Date"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Mfg_Date.split('T')[0]}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="text"
              name="Quantity"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Quantity}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Storage Conditions(in ℃)</label>
            <input
              type="number"
              name="Storage_Conditions"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Storage_Conditions}
              disabled={true}
            />
          </div>
          
          
          <div>
            <label className="block text-sm font-semibold mb-2">Packing Type</label>
            <select
              name="Packing_Type"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
            >
              <option defaultValue={state.Packing_Type}>{state.Packing_Type}</option>
              
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Treatment Type</label>
            <input
              type="text"
              name="Treatment_Type"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={state.Treatment_Type}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Sample Registered By</label>
            <input
              type="text"
              name="Treatment_Type"
              className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
              defaultValue={registrationUser ? registrationUser : ''}
              disabled={true}
            />
          </div>
          
          
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Group</label>
          <select
            name="Group"
            className="w-full border-2 border-blue-600 rounded-md p-2 bg-white"
          >
            <option value={state.Group}>{state.Group}</option>
          </select>
        </div>
        <div className="pt-2">
          <h2 className="text-sm font-semibold mb-2">Type of Testing</h2>

          <div className={`${state.Type_Of_Testing.length > 4
                    ? "max-h-64 overflow-y-auto border-2 border-blue-600"
                    : "border-2 border-blue-600"
                    }`}> 
            {
                state.Type_Of_Testing.map((item,index)=>{
                    return (
                        <div key={index} className='flex flex-col bg-white'>
                            <div className='font-semibold pl-2'>
                                {index+1}.{item}
                            </div>
                        </div>
                    )
                })
            }  
          </div>
        </div>
        <div className="">
          <h2 className="text-sm font-semibold mb-2">Tests</h2>
          <div className={`${state.Tests.length > 4
                      ? "max-h-64 overflow-y-auto border-2 border-blue-600"
                      : "border-2 border-blue-600"
                      }`}>

            {
                testData.map((item,index)=>{
                    return (
                        <div key={index} className='flex flex-col pl-2 bg-white'>
                          <div className='font-semibold'>{item.Type_Of_Testing}</div>
                          {
                            item.Tests.map((data,i)=>{
                              return <div key={i}>{i+1}.{data}</div>
                            })
                          }
                            
                        </div>
                    )
                })
            }
          </div>
          
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Remarks</label>
          <input
            type="text"
            name="Remarks"
            className="w-full rounded-md p-2 border-2 border-blue-600 bg-white"
            defaultValue={state.Remarks}
            disabled={true}
          />
          {
            state.difference==='All Sample History'?state.Upload_File.length>0?(
              <div className='flex overflow-x-auto w-full pt-2 gap-2'>
                {
                  state.Upload_File?.filter((data)=>data.Sample_ID===state._id)?.map((item,i)=>{
                    return(
                      <div className='w-fit flex flex-col gap-1 pl-1' key={`${i}-${item.Analyst_ID}`}>
                        <div>{item.Analyst_Name.toUpperCase()}</div>
                        <div><button className="bg-indigo-700 hover:bg-indigo-800 rounded-md text-white px-2 py-1" onClick={()=>handleDownload(item.FileUrl)}>Download </button></div>
                      </div>   
                    )
                  })
                }
              </div>
            )
            :(
              <span></span>
            )
            :
            (
              <span></span>
            )
          }
        </div>
      </div>
  );
};



export default FullHistory