import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const FullHistory = () => {
    const navigate=useNavigate();
    const {state}=useLocation();//gets value througn data passes from previous component as second parameter of navigate hook
    const [testData,setTestData]=useState([])
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
        navigate('/AllSampleHistory')
      }
      else if(state.difference==='ParticularUser Sample History'){
        navigate('/SampleRegistrationUser/SampleHistory')
      }
    }
  return (
    <div  className="space-y-6 max-w-full mx-auto p-6 bg-white">
        <div className='w-full'><button type="button" className='bg-indigo-700 text-white rounded-md hover:bg-indigo-900 px-4 py-1 float-right' onClick={handleBackNavigation}>Back</button></div>
        <div className="font-bold text-2xl text-center">Full Sample Information</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="Name"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Name}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="text"
              name="Quantity"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Quantity}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Storage Conditions</label>
            <input
              type="number"
              name="Storage_Conditions"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Storage_Conditions}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Registration Number</label>
            <input
              type="number"
              name="Registration_Number"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Registration_Number}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Code</label>
            <input
              type="number"
              name="Customer_Code"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Customer_Code}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Packing Type</label>
            <select
              name="Packing_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            >
              <option defaultValue={state.Packing_Type}>{state.Packing_Type}</option>
              
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="text"
              name="Date"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Date.split('T')[0]}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Treatment Type</label>
            <input
              type="text"
              name="Treatment_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Treatment_Type}
              disabled={true}
            />
          </div>
          <div>
          <label className="block text-sm font-semibold mb-2">Nature Of Sample</label>
          <input
            type="text"
            name="Nature_Of_Sample"
            className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            defaultValue={state.Nature_Of_Sample}
            disabled={true}
          />
          </div>
          
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Remarks</label>
          <input
            type="text"
            name="Remarks"
            className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            defaultValue={state.Remarks}
            disabled={true}
          />
        </div>
        <div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          
          <div >
          
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Group</label>
              <select
                name="Group"
                className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              >
                <option value={state.Group}>{state.Group}</option>
              </select>
            </div>
            <div className="pt-2">
              <h2 className="text-sm font-semibold mb-2">Type of Testing</h2>

              <div className={`${state.Type_Of_Testing.length > 1
                        ? "max-h-32 overflow-y-auto"
                        : ""
                        }`}> 
                {
                    state.Type_Of_Testing.map((item,index)=>{
                        return (
                            <div key={index} className='flex flex-col bg-slate-100'>
                                <div className='font-semibold pl-2'>
                                    {index+1}.{item}
                                </div>
                            </div>
                        )
                    })
                }  
              </div>

            </div>
          </div>
          
          <div className="">
            <h2 className="text-sm font-semibold mb-2">Tests</h2>
            <div className={`${state.Type_Of_Testing.length > 1
                        ? "max-h-64 overflow-y-auto"
                        : ""
                        }`}>

              {
                  testData.map((item,index)=>{
                      return (
                          <div key={index} className='flex flex-col bg-slate-100 pl-2'>
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
      
        </div>
      </div>
  );
};



export default FullHistory