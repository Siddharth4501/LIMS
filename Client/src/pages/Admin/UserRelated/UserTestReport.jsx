import React from "react";
import { FaPrint } from "react-icons/fa6";


const UserTestReport = () => {
    const handlePrint=()=>{
        window.print();
    }
    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md border p-8 rounded-md">

                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                    {/* Logo */}
                    <img
                        src="https://as1.ftcdn.net/v2/jpg/05/70/02/38/1000_F_570023894_aEJmzXhHYzZFSnuKg7F7Ed9m323K7KVw.jpg"
                        alt="Logo"
                        className="w-20 h-20"
                    />
                    {/* Title */}
                    <div className="text-center flex-1">
                        <h1 className="text-xl font-bold uppercase">
                            Defence Food Research Laboratory
                        </h1>
                        <p className="text-sm">
                            DFRL, Siddhartha Nagar, Mysuru, Karnataka 570011
                        </p>
                        <h2 className="text-lg font-semibold mt-2">Test Report</h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <p>
                            <span className="font-semibold">Report No:</span>
                            DFRL/FOOD/24/0004/01/R0
                        </p>
                        <p>
                            <span className="font-semibold">Issued To:</span> Sofist
                            Solution's, Malad, Mumbai
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-semibold">Report Issue Date:</span>
                            25/11/2024
                        </p>
                        <p>
                            <span className="font-semibold">Your Ref:</span>
                            JOB/D3/NBT/16/06/2023
                        </p>
                    </div>
                </div>

                <div className="border-t mt-6 pt-4">
                    <h3 className="font-semibold text-lg">Sample Details:</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <p className="">
                                <span className="font-semibold">Registration No:</span>
                                DFRL/FOOD/24/0004/01
                            </p>
                            <p>
                                <span className="font-semibold">Sample Name:</span> hjkh
                            </p>
                            <p>
                                <span className="font-semibold">Mfg. Date:</span> -
                            </p>
                            <p>
                                <span className="font-semibold">Sample Registration Date:</span>
                                25/11/2024
                            </p>
                            <p>
                                <span className="font-semibold">Sample Conditions:</span> -
                            </p>
                            <p>
                                <span className="font-semibold">Temperature of Sample:</span> -
                            </p>
                            <p>
                                <span className="font-semibold">Analysis Start Date:</span> -
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">Batch No/Customer Code:</span>
                                -
                            </p>
                            <p>
                                <span className="font-semibold">Sample Description:</span>
                                jchjhk
                            </p>
                            <p>
                                <span className="font-semibold">Expiry Date:</span> -
                            </p>
                            <p>
                                <span className="font-semibold">Sample Drawn By:</span> -
                            </p>
                            <p>
                                <span className="font-semibold">Quantity Received:</span> -
                            </p>
                            <p>
                                <span className="font-semibold">Discipline:</span> -
                            </p>
                            <p>
                                <span className="font-semibold">Analysis Completion Date:</span> -
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="border-t mt-6 pt-4">
                    <h3 className="font-semibold text-lg">Test Results:</h3>
                    <table className="w-full border mt-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Sr.No</th>
                                <th className="border px-4 py-2">Test Parameters</th>
                                <th className="border px-4 py-2">Result</th>
                                <th className="border px-4 py-2">Unit</th>
                                <th className="border px-4 py-2">Specification Limit</th>
                                <th className="border px-4 py-2">Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2 text-center">1</td>
                                <td className="border px-4 py-2">Benzoic Acid</td>
                                <td className="border px-4 py-2 text-center">45</td>
                                <td className="border px-4 py-2 text-center">mg/kg</td>
                                <td className="border px-4 py-2 text-center">-</td>
                                <td className="border px-4 py-2 text-center">
                                    DFRL/SOP/CHEM/219/01
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-center">2</td>
                                <td className="border px-4 py-2">Vitamin D</td>
                                <td className="border px-4 py-2 text-center">454</td>
                                <td className="border px-4 py-2 text-center">%</td>
                                <td className="border px-4 py-2 text-center">-</td>
                                <td className="border px-4 py-2 text-center">
                                    DFRL/SOP/CHEM/220/01
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
                <div className="border-t mt-6 pt-4">
                    <h3 className="font-semibold text-lg mb-4">Test Results : </h3>
                    <div className="text-center font-medium text-base mb-2">
                        Type Of Testing Name
                    </div>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border border-collapse text-left text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-2 py-1 text-center">Sr. No</th>
                                    <th className="border px-2 py-1">Tests</th>
                                    <th className="border px-2 py-1 text-center">Result</th>
                                    <th className="border px-2 py-1 text-center">Unit</th>
                                    <th className="border px-2 py-1">Method</th>
                                    <th className="border px-2 py-1">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* to get 9 rows */}
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border px-2 py-1 text-center">{index + 1}</td>
                                        <td className="border px-2 py-1"></td>
                                        <td className="border px-2 py-1 text-center"></td>
                                        <td className="border px-2 py-1 text-center"></td>
                                        <td className="border px-2 py-1"></td>
                                        <td className="border px-2 py-1"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Verified By Section */}
                    <div className="flex justify-end mt-6">
                        <div className="text-center">
                            <p className="font-semibold">Verified By</p>
                            <p>(Dr. G. Phanu Kumar)</p>
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


                {/* <div className="border-t mt-6 pt-4">
                    <h3 className="font-semibold text-lg">Remarks:</h3>
                    <p className="mt-2">Sample Confirmity Remarks</p>
                </div>


                <div className="flex justify-between items-center mt-6">
                    <p>Checked By:</p>
                    <p>Authorized By:</p>
                </div> */}
                <div className="flex my-8">
                    <button onClick={handlePrint}>Print</button>
                    <div><FaPrint/></div>
                </div>
            </div>
        </div>
    );
};

export default UserTestReport;

