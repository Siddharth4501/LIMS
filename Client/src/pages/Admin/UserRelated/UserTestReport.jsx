import React, { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTMANData } from "../../../Redux/Slices/SampleSlice";
import { getAllUserData } from "../../../Redux/Slices/AuthSlice";
import { getGroupData } from "../../../Redux/Slices/GroupSilce";
import { getSubstanceData } from "../../../Redux/Slices/SubstanceSlice";

const UserTestReport = () => {
    const {TmAnData}=useSelector((state)=>state.sample)
    const {allUserData}=useSelector(state=>state.auth);
    const {groupData}=useSelector(state=>state.group);
    const { substanceData } = useSelector((state) => state.substance);
    const {state}=useLocation();
    const [ReportNo,setReportNo]=useState('')
    const dispatch=useDispatch();
    const [allUserDataState,setAllUserDataState]=useState();
    const [filteredUser,setFilteredUser]=useState();
    const [TmAnDataState,setTmAnDataState]=useState([])
    const [allGroupDataState,setAllGroupDataState]=useState([])
    const [filteredTmAnData,setFilteredTmAnData]=useState([]);
    const [ulrNumber,setUlrNumber]=useState([])
    const [allSubstanceDataState, setAllSubstanceDataState] = useState([]);
    const [foundGroupID,setFoundGroupID]=useState('');
    
    useEffect(() => {
        (async () => {
        await dispatch(getTMANData());
        await dispatch(getAllUserData());
        await dispatch(getGroupData());
        await dispatch(getSubstanceData());
        })();
    }, []);

    useEffect(() => {
        setAllSubstanceDataState(substanceData);
    }, [substanceData])
    console.log(state);

    const handlePrint=()=>{
        window.print();
    }
    
    console.log(TmAnData)
    useEffect(() => {
        setTmAnDataState(TmAnData);
    }, [TmAnData])
    useEffect(() => {
        setAllUserDataState(allUserData);
    }, [allUserData])
    useEffect(() => {
        setAllGroupDataState(groupData);
    },[groupData])

    useEffect(()=>{
        const foundGroupInstance= allGroupDataState?.find((group)=>group.Group_Name===state.Group);
        if(foundGroupInstance){
            setFoundGroupID(foundGroupInstance._id);
        }
    },[allGroupDataState])
    useEffect(() => {
        const filteredUser = allUserDataState?.find((user) => user._id === state.Registered_By);
        setFilteredUser(filteredUser);
    }, [allUserDataState]);
    useEffect(() => {
        const filteredItem = TmAnDataState?.filter((item) => item.Sample_Alloted === state._id);
        if (filteredItem?.length > 0) {
            setFilteredTmAnData(filteredItem);
        }
    }, [TmAnDataState])
    console.log(filteredTmAnData, "filteredTmAnData")
    useEffect(() => {
        const generateReportNumber = () => {
            const RegistrationNo = parseInt(state.Registration_Number.split('/')[2], 10);
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
    }, []);

    useEffect(() => {
        if (state.difference === 'NABL Report') {
            const generateULRNumber = () => {
                let ULRNum = `TC11645`;
                const date = new Date();
                const year = date.getFullYear();
                const lastTwoDigits = (year % 100);
                const GroupLocationNumber = String(allGroupDataState?.find(group => group.Group_Name === state.Group)?.Group_Location_Number);
                const RunningNumber = String(parseInt(state.Registration_Number.split('/')[2], 10)).padStart(8, '0')
                ULRNum += lastTwoDigits + GroupLocationNumber + RunningNumber + 'F'
                setUlrNumber(ULRNum);
            }
            generateULRNumber();
        }
    },[allGroupDataState])
    console.log(ulrNumber,"tyux");
    console.log(allGroupDataState,"fwrf");
    console.log(foundGroupID,"dwq");
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
                    {
                        state.difference === 'NABL Report' ? (
                            <img
                                src="/src/assets/images/NABL-LOGO.png"
                                alt="Logo"
                                className="w-24 h-22 mr-5"
                            />
                        ) :
                            (
                                ''
                            )
                    }
                </div>
                {
                    state.difference === 'NABL Report' ? (
                        <div className="w-full border-b border">
                            <div className="float-right"><b>ULR No. : </b>{ulrNumber ? ulrNumber : ''}</div>
                        </div>
                    ) : (
                        <div className="h-0 w-0"></div>
                    )
                }
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <p>
                            <span className="font-semibold">Report No: </span>
                            {ReportNo ? ReportNo : ''}
                        </p>
                        <p>
                            <span className="font-semibold">Issued To: </span> {state.Issued_To}

                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-semibold">Report Issue Date: </span>
                            {state.Completion_Date.split('T')[0]}
                        </p>
                    </div>
                </div>

                <table className="mt-6 w-full">
                    <h3 className="font-semibold text-lg">Sample Details:</h3>
                    <tbody>
                        <tr>
                            <td className="border border-black p-2 font-semibold">Registration No:</td>
                            <td className="border border-black p-2">{state.Registration_Number}</td>
                            <td className="border border-black p-2 font-semibold">Batch No/Customer Code:</td>
                            <td className="border border-black p-2">{state.Customer_Code}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 font-semibold">Sample Name:</td>
                            <td className="border border-black p-2">{state.Name}</td>
                            <td className="border border-black p-2 font-semibold">Sample Description:</td>
                            <td className="border border-black p-2">{state.Remarks}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 font-semibold">Mfg. Date:</td>
                            <td className="border border-black p-2">{state.Mfg_Date ?state.Mfg_Date.split('T')[0] : 'N/A'}</td>
                            <td className="border border-black p-2 font-semibold">Sample Drawn By:</td>
                            <td className="border border-black p-2">{filteredUser ? filteredUser.fullName : ''}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 font-semibold">Sample Registration Date:</td>
                            <td className="border border-black p-2">{state.Date.split('T')[0]}</td>
                            <td className="border border-black p-2 font-semibold">Quantity Received:</td>
                            <td className="border border-black p-2">{state.Quantity}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-2 font-semibold">Storage Conditions (in ℃):</td>
                            <td className="border border-black p-2">{state.Storage_Conditions}</td>
                            <td className="border border-black p-2"></td>
                            <td className="border border-black p-2"></td>
                        </tr>
                    </tbody>
                </table>



                <div className="mt-6 pt-4">
                    <h3 className="font-semibold text-lg mb-4">Test Results : </h3>
                    {
                        state.difference === 'Normal Report' && filteredTmAnData.length > 0 ? Object.keys(filteredTmAnData[0]?.Substances_To_Be_Analysed)?.map((key, i) => {
                            return (
                                <div className="mb-5" key={`${key}-${i}`}>
                                    <div className="text-center font-medium text-base mb-2">
                                        {key}
                                    </div>
                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full border border-collapse text-sm">
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
                                                            <td className="border px-2 py-1 text-center">       
                                                                {
                                                                    allSubstanceDataState
                                                                        ?.filter((subs) => subs.GroupID === foundGroupID)
                                                                        ?.flatMap((item) =>
                                                                            item.MethodUnitList
                                                                                .filter((data) => data.Method === test.Method && data.Limit !== "")
                                                                                .map((data) => data.Limit)
                                                                        )
                                                                        ?.at(0) || "N/A"
                                                                }         
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                    
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        })

                            :
                            state.difference === 'NABL Report' && filteredTmAnData.length > 0 ? Object.keys(filteredTmAnData[0]?.Substances_To_Be_Analysed)?.map((key, i) => {
                                const filteredItem = filteredTmAnData[0]?.Substances_To_Be_Analysed[key].Tests.filter((data) => data.NABL === true);
                                if (filteredItem.length > 0) {
                                    return (
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
                                                                    <td className="border px-2 py-1 text-center">
                                                                        {
                                                                            allSubstanceDataState
                                                                                ?.filter((subs) => subs.GroupID === foundGroupID)
                                                                                ?.flatMap((item) =>
                                                                                    item.MethodUnitList
                                                                                        .filter((data) => data.Method === test.Method && data.Limit !== "")
                                                                                        .map((data) => data.Limit)
                                                                                )
                                                                                ?.at(0) || "N/A"
                                                                        } 
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                            
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                                :
                                <span className="w-0"></span>
                    }

                    {/* Verified By Section */}
                    <div className="flex justify-end mt-24">
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
                    <button className="flex justify-center mx-auto bg-blue-500 px-4 py-1 text-white my-5 hover:bg-blue-600 " onClick={handlePrint}><span className="pt-1 pr-1"><FaPrint /></span>Print</button>
                </div>

            </div>
        </div>
    );
};

export default UserTestReport;

