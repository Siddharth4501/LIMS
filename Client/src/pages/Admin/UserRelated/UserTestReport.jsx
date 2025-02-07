import React, { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTMANData } from "../../../Redux/Slices/SampleSlice";
import { getAllUserData } from "../../../Redux/Slices/AuthSlice";
import { getGroupData } from "../../../Redux/Slices/GroupSilce";

const UserTestReport = () => {
    const {TmAnData}=useSelector((state)=>state.sample)
    const {allUserData}=useSelector(state=>state.auth);
    const {groupData}=useSelector(state=>state.group);
    const {state}=useLocation();
    const [ReportNo,setReportNo]=useState('')
    const dispatch=useDispatch();
    const [allUserDataState,setAllUserDataState]=useState();
    const [filteredUser,setFilteredUser]=useState();
    const [TmAnDataState,setTmAnDataState]=useState([])
    const [allGroupDataState,setAllGroupDataState]=useState([])
    const [filteredTmAnData,setFilteredTmAnData]=useState([]);
    const [ulrNumber,setUlrNumber]=useState([])
    console.log(state);
    const handlePrint=()=>{
        window.print();
    }
    useEffect(() => {
        (async () => {
        await dispatch(getTMANData());
        await dispatch(getAllUserData());
        await dispatch(getGroupData());
        })();
    }, []);
    console.log(TmAnData)
    useEffect(() => {
        setTmAnDataState(TmAnData);
    },[TmAnData])
    useEffect(() => {
        setAllUserDataState(allUserData);
    },[allUserData])
    useEffect(() => {
        setAllGroupDataState(groupData);
    },[groupData])
    useEffect(() => {
        const filteredUser=allUserDataState?.find((user)=>user._id===state.Registered_By);
        setFilteredUser(filteredUser);
    },[allUserDataState]);
    useEffect(()=>{
        const filteredItem=TmAnDataState?.filter((item)=>item.Sample_Alloted===state._id );
        if(filteredItem?.length>0){
            setFilteredTmAnData(filteredItem);
        }
    },[TmAnDataState])
    console.log(filteredTmAnData,"filteredTmAnData")
    useEffect(()=>{
        const generateReportNumber = ()=> {
            const RegistrationNo=parseInt(state.Registration_Number.split('/')[2],10);
            const date = new Date();
            const year = date.getFullYear();
            const lastTwoDigits = year % 100;
            let newNumber = `DIBT/AR/${lastTwoDigits}/`;
            
            if (RegistrationNo) {  
                newNumber += String(RegistrationNo).padStart(6, '0');
                setReportNo(newNumber);
            }
        };
        generateReportNumber();
    },[]);

    useEffect(()=>{
        if(state.difference==='NABL Report'){
            const generateULRNumber=()=>{
                let ULRNum = `TC`;
                const RegistrationNo=String(parseInt(state.Registration_Number.split('/')[2],10)).padStart(6, '0');
                const date = new Date();
                const year = date.getFullYear();
                const lastTwoDigits = (year % 100);
                const GroupLocationNumber=String(allGroupDataState?.find(group=>group.Group_Name===state.Group)?.Group_Location_Number);
                const RunningNumber=String(parseInt(state.Registration_Number.split('/')[2],10)).padStart(8, '0')
                ULRNum +=RegistrationNo + lastTwoDigits + GroupLocationNumber + RunningNumber + 'F'
                setUlrNumber(ULRNum);
            }
            generateULRNumber();
        }
    },[allGroupDataState])
    console.log(ulrNumber,"tyux");
    console.log(allGroupDataState,"fwrf");
    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md border p-8 rounded-md">

                {/* Header */}
                <div className="flex items-center justify-between pb-4">
                    {/* Logo */}
                    <img
                        src="/src/assets/images/DIBT.jpg"
                        alt="Logo"
                        className="w-24 h-22"
                    />
                    {
                        state.difference==='NABL Report'?(
                            <img
                                src="/src/assets/images/NABL_Logo.jpg"
                                alt="Logo"
                                className="w-24 h-22 ml-5"
                            />
                        ):
                        (
                            ''
                        )
                    }
                    {/* Title */}
                    <div className="text-center flex-1">
                        <h1 className="text-xl font-bold uppercase">
                            DEFENCE INSTITUTE OF BIO-DEFENCE TECHNOLOGIES
                        </h1>
                        <p className="text-lg">
                            Food Quality Assurance <br />
                            DIBT (DFRL), Siddhartha Nagar Mysuru, Karnataka 570011

                        </p>
                        <h2 className="text-lg font-bold mt-2">Test Report</h2>
                    </div>
                </div>
                {
                    state.difference==='NABL Report'?(
                        <div className="w-full border-b border">
                            <div className="float-right"><b>ULR No. : </b>{ulrNumber?ulrNumber:''}</div>
                        </div>
                    ):(
                        <div className="h-0 w-0"></div>
                    )
                }
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <p>
                            <span className="font-semibold">Report No:</span>
                            {ReportNo?ReportNo:''}
                        </p>
                        <p>
                            <span className="font-semibold">Issued To:</span> {state.Issued_To}
                            
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-semibold">Report Issue Date:</span>
                            25/11/2024
                        </p>
                    </div>
                </div>

                <div className="border-t mt-6 pt-4">
                    <h3 className="font-semibold text-lg">Sample Details:</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <p className="">
                                <span className="font-semibold">Registration No:</span>
                                {state.Registration_Number}
                            </p>
                            <p>
                                <span className="font-semibold">Sample Name:</span> 
                                {state.Name}
                            </p>
                            <p>
                                <span className="font-semibold">Mfg. Date:</span> - {state.Mfg_Date.split('T')[0]}
                            </p>
                            <p>
                                <span className="font-semibold">Sample Registration Date:</span>
                                {state.Date.split('T')[0]}
                            </p>
                            <p>
                                <span className="font-semibold">Storage Conditions (in ℃):</span> 
                                {state.Storage_Conditions}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">Batch No/Customer Code:</span>
                                - {state.Customer_Code}
                            </p>
                            <p>
                                <span className="font-semibold">Sample Description:</span>
                                {state.Remarks}
                            </p>
                            <p>
                                <span className="font-semibold">Sample Drawn By:</span> - {filteredUser?filteredUser.fullName : ''}
                            </p>
                            <p>
                                <span className="font-semibold">Quantity Received:</span> - 
                                {state.Quantity}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-6 pt-4">
                    <h3 className="font-semibold text-lg mb-4">Test Results : </h3>
                    {
                        state.difference==='Normal Report' && filteredTmAnData.length>0?Object.keys(filteredTmAnData[0]?.Substances_To_Be_Analysed)?.map((key,i) => {
                            return(
                                <div className="mb-5" key={`${key}-${i}`}>
                                    <div className="text-center font-medium text-base mb-2">
                                        {key}
                                    </div>
                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full border border-collapse text-left text-sm">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border px-2 py-1 text-center">Sr. No</th>
                                                    <th className="border px-2 py-1 test-center">Test</th>
                                                    <th className="border px-2 py-1 text-center">Result</th>
                                                    <th className="border px-2 py-1 text-center">Unit</th>
                                                    <th className="border px-2 py-1 text-center">Method</th>
                                                    <th className="border px-2 py-1 text-center">Limit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                filteredTmAnData[0]?.Substances_To_Be_Analysed[key]?.Tests?.map((test,index)=> {
                                                    
                                                    return(
                                                        <tr key={`${test}-${index}-${i}`} className="hover:bg-gray-50">
                                                            <td className="border px-2 py-1 text-center">{index + 1}</td>
                                                            <td className="border px-2 py-1 text-center">{test.Test.Test_Name}</td>
                                                            <td className="border px-2 py-1 text-center">{test.Result}</td>
                                                            <td className="border px-2 py-1 text-center">{test.Unit}</td>
                                                            <td className="border px-2 py-1 text-center">{test.Method}</td>
                                                            <td className="border px-2 py-1 text-center">{test.Limit ? test.Limit:'_____'}</td>
                                                        </tr>
                                                    )
                                                })}
                                                    
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )})

                            :
                            state.difference==='NABL Report' && filteredTmAnData.length>0?Object.keys(filteredTmAnData[0]?.Substances_To_Be_Analysed)?.map((key,i) => {
                                const filteredItem=filteredTmAnData[0]?.Substances_To_Be_Analysed[key].Tests.filter((data)=>data.NABL===true );
                                if(filteredItem.length>0){
                                    return(
                                        <div className="mb-5" key={`${key}-${i}`}>
                                            <div className="text-center font-medium text-base mb-2">
                                                {key}
                                            </div>
                                            {/* Table */}
                                            <div className="overflow-x-auto">
                                                <table className="w-full border border-collapse text-left text-sm">
                                                    <thead>
                                                        <tr className="bg-gray-100">
                                                            <th className="border px-2 py-1 text-center">Sr. No</th>
                                                            <th className="border px-2 py-1 text-center">Test</th>
                                                            <th className="border px-2 py-1 text-center">Result</th>
                                                            <th className="border px-2 py-1 text-center">Unit</th>
                                                            <th className="border px-2 py-1 text-center">Method</th>
                                                            <th className="border px-2 py-1 text-center">Limit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        filteredTmAnData[0]?.Substances_To_Be_Analysed[key]?.Tests?.filter((ele)=>ele.NABL===true).map((test,index)=> {
                                                            
                                                            return(
                                                                <tr key={`${test}-${index}-${i}`} className="hover:bg-gray-50">
                                                                    <td className="border px-2 py-1 text-center">{index + 1}</td>
                                                                    <td className="border px-2 py-1 text-center">{test.Test.Test_Name}</td>
                                                                    <td className="border px-2 py-1 text-center">{test.Result}</td>
                                                                    <td className="border px-2 py-1 text-center">{test.Unit}</td>
                                                                    <td className="border px-2 py-1 text-center">{test.Method}</td>
                                                                    <td className="border px-2 py-1 text-center">{test.Limit ? test.Limit:'_____'}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                            
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                })
                                :
                                <span className="w-0"></span>
                            }

                    {/* Verified By Section */}
                    <div className="flex justify-end mt-6">
                        <div className="text-center">
                            <p className="font-semibold">Verified By</p>
                            <p>(Dr. G.Phani Kumar,Sc.F)</p>
                        </div>
                    </div>
                    {/* Notes Section */}
                    <div className="border border-gray-300 rounded-md mt-4 p-3 bg-gray-50">
                        <p className="text-xs">
                            <span className="font-semibold">NOTE:</span> The test report of the
                            samples conforms to the above tested parameters only. <br />
                            The test result relates only to the sample submitted for analysis.
                            Information of submitted samples as provided by the customer. <br />
                            Perishable samples will be stored till the end of analysis, and
                            non-perishable samples for 15 days from report dispatch. <br />
                            <span className="font-semibold">ND:</span> Not Detected.
                        </p>
                    </div>

                </div>

                <div className="w-full">
                    <button className="flex justify-center mx-auto bg-blue-500 px-4 py-1 text-white my-5 hover:bg-blue-600 " onClick={handlePrint}><span className="pt-1 pr-1"><FaPrint/></span>Print</button>
                </div>
        
            </div>
        </div>
    );
};

export default UserTestReport;

