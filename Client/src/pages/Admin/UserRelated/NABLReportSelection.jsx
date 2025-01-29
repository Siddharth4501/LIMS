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
    console.log(substances,"opin");
    const handleNABLChange=(e,typeOfTesting,testID)=>{
        const { value } = e.target;
        console.log(value,"jfojewojr")
        setSubstance((prevState) => ({
            ...prevState,
            [typeOfTesting]:{
                ...prevState[typeOfTesting],//always destructured in an object
                Tests:prevState[typeOfTesting].Tests.map((item) =>//prevState[typeOfTesting] represent previous value of the key 
                item.Test.TestID===testID
                    ? { ...item, NABL: value==='on'?true:false || false }
                    : item
                ),
            } 
        }));
    }
    useEffect(() => {
        const found = TmAnDataState?.find((item)=>item.Sample_Alloted===state._id && item.TM_Status==='Approved By TM');
        setFound(found);
        setSubstance(found?.Substances_To_Be_Analysed);
    }, [TmAnData,TmAnDataState]);
    console.log("first",found)

    const handleNABLDataSubmit=async()=>{
        let flag=false;
        for(let key in substances){
            flag=substances[key].Tests.some((test)=>test.NABL===true)
            console.log(flag,"dwed")
            // if(flag){
            //     return
            // }
        }
        // if(flag===false){
        //     toast.error("Please Select At Least One Test");
        //     return
        // }
        const data={
            "NABL_Related_Substances_To_Be_Analysed":substances,
            "TMANID":found._id,
            "NABL":true
        }
        try{
            const response=await dispatch(updateTMANData(data));
            if(response?.payload?.success){
                toast.success("Successfully Selected NABL Data");
                navigate('/UserTestReport',{state:{...state}});
            }
        }
        catch(error){
            toast.error(error?.message);
        }

    }
  return (
    <div className='bg-gray-100 min-h-screen'>
        <br /><br /><br />
        <div className='w-3/4 min-h-96 flex justify-center bg-white m-auto border-2 border-slate-600'>
            <div className='w-full p-2'>
                {
                    found?(
                        <div className='w-full' >
                            <div className={Object.keys(found.Substances_To_Be_Analysed).length>1 ? 'w-full max-h-[600px] overflow-y-auto':'w-full'}>
                                {
                                    Object.keys(found.Substances_To_Be_Analysed)?.map((key,i)=>{
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
                                                        found.Substances_To_Be_Analysed[key]?.Tests.map((test,index)=>{
                                                            return(
                                                                <tbody key={`${key}-${i}-${index}`}>
                                                                    <tr className="hover:bg-gray-100">
                                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{index+1}.</td>
                                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{test.Test.Test_Name}</td>
                                                                        <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><input type="radio" name={`name-${key}-${i}-${index}`} id={`id-${key}-${i}-${index}`} onChange={(e)=>handleNABLChange(e,key,test.Test.TestID)}/></td>
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