import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTMANData, updateTMANData } from '../../../Redux/Slices/SampleSlice'
import toast from 'react-hot-toast'

const NABLReportSelection = () => {
    const {TmAnData}=useSelector(state=>state.sample)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {state}=useLocation();
    const [found,setFound]=useState()
    const [selectAllTestsState,setSelectAllTestState]=useState(false);
    useEffect(() => {
          (async () => {
          await dispatch(getTMANData());
          })();
      }, []);
    console.log(TmAnData);
    const [TmAnDataState,setTmAnDataState]=useState([]);
    useEffect(() => {
        setTmAnDataState(TmAnData);
        },[TmAnData])
    const [substances,setSubstance]=useState()
    useEffect(() => {
        const foundItem = TmAnDataState?.find((item)=>item.Sample_Alloted===state._id && item.TM_Status==='Approved By TM');
        setFound(foundItem);
        setSubstance(foundItem?.Substances_To_Be_Analysed);
    }, [TmAnData,TmAnDataState,found]);
    console.log("first",found)
    console.log(substances,"opin");
    useEffect(() => {
        if (!substances || Object.keys(substances).length === 0) {
            setSelectAllTestState(false);
            return;
        }
    
        const allTestsSelected = Object.values(substances).every((substance) =>
            substance.Tests?.every((test) => test.NABL === true)
        );
    
        setSelectAllTestState(allTestsSelected);
    }, [substances]);
    
    const handleNABLChange=(e,typeOfTesting,testID)=>{
        const isChecked= e.target.checked;
        setSubstance((prevState) => ({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],//always destructured in an object
                Tests:prevState[typeOfTesting].Tests.map((item) =>//prevState[typeOfTesting] represent previous value of the key 
                item.Test.TestID===testID
                    ? { ...item, NABL: isChecked }
                    : item
                ),
            } 
        }));
    }
    const handleSelectAllTests=(e)=>{
        const isChecked= e.target.checked;
        setSubstance((prevState) => {
            const updatedState = Object.keys(prevState).reduce((acc, key) => {
                acc[key] = {
                    ...prevState[key],
                    Tests: prevState[key].Tests.map((item) => ({
                        ...item,
                        NABL: isChecked, // Updating NABL immutably
                    })),
                };
                return acc;
            }, {});
        
            return updatedState;
        });
        
    }

    const handleNABLDataSubmit=async()=>{
        let flag=false;
        for(let key in substances){
            if(substances[key].Tests.some((test)=>test.NABL===true)){
                flag=true;
                break;
            }
        }
        if(flag===false){
            toast.error("Please Select At Least One Test");
            return
        }
        const data={
            "TM_Status":"Approved By TM",
            "NABL_Related_Substances_To_Be_Analysed":substances,
            "TMANID":found._id,
            "NABL_Page":true
        }
        console.log(flag,"Dwdw")
        try{
            const response=await dispatch(updateTMANData(data));
            if(response?.payload?.success){
                toast.success("Successfully Selected NABL Data");
                navigate('/UserTestReport',{state:{...state,difference:'NABL Report'}});
            }
        }
        catch(error){
            toast.error(error?.message);
        }

    }
  return (
    <div className='bg-gray-100 min-h-screen'>
        <br /><br /><br />
        <div className='w-3/4 flex justify-center bg-white m-auto border-2 border-slate-600'>
            <div className='w-full p-2'>
                {
                    found?(
                        <div className='w-full' >
                            <div className={Object.keys(substances).length>0 ? 'w-full max-h-[600px] overflow-y-auto':'w-full'}>
                                <div className='w-full'>
                                    <div className='float-right'>
                                        <label htmlFor="SelectAllCheckBoxName" className='p-1 font-semibold'>Select All:</label>
                                        <input type="checkbox" name="SelectAllCheckBoxName" id="SelectAllCheckBoxID" className=' h-4 w-4' checked={selectAllTestsState} onChange={(e)=>handleSelectAllTests(e)} />
                                    </div>
                                </div>
                                <br />
                                {
                                    Object.keys(substances)?.map((key,i)=>{
                                        return(
                                            <div className='mb-3' key={`${key}-${i}`}>
                                                <div className='w-full text-center text-lg font-semibold'>{key}</div>
                                                <table className='table-auto w-full border-collapse border border-gray-300'>
                                                    <thead>
                                                        <tr className="bg-slate-200">
                                                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                                                            <th className="border border-gray-300 px-4 py-2 text-center">Test</th>
                                                            <th className="border border-gray-300 px-4 py-2 text-center">NABL</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        substances[key]?.Tests.map((test,index)=>{
                                                            return(
                                                                <tbody key={`${key}-${i}-${index}`}>
                                                                    <tr className="hover:bg-gray-100">
                                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index+1}.</td>
                                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{test.Test.Test_Name}</td>
                                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><input type="checkbox" name={`name-${key}-${i}-${index}`} id={`id-${key}-${i}-${index}`} checked={test.NABL} onChange={(e)=>handleNABLChange(e,key,test.Test.TestID)}/></td>
                                                                    </tr>
                                                                </tbody>

                                                            )
                                                            })
                                                    }
                                                </table>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='m-3'><button className='bg-indigo-700 hover:bg-indigo-900 text-white text-center text-lg font-semibold px-4 py-1 rounded-md flex mx-auto' onClick={handleNABLDataSubmit}>Submit</button></div>
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default NABLReportSelection