// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import {  BsTrash } from "react-icons/bs";
// import { DeleteUserRole } from '../../../Redux/Slices/AuthSlice';
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { getGroupData } from '../../../Redux/Slices/GroupSilce';

// const UserListViewMore = () => {
//     const {state}=useLocation();
//     const dispatch=useDispatch()
//     const navigate=useNavigate();
//     console.log(state);
//     const { groupData } = useSelector((state) => state.group);
//     const [sections, setSections] = useState([]);
//     const [fullName,setFullName]=useState(state.fullName);
//     const [email,setEmail]=useState(state.email);
//     const [allRoles] = useState(["Technical Manager", "Analyst", "Sample Review","Sample Registration"]);
//     const [remainingRole,setRemainingRole]=useState([])
//     const [errors, setErrors] = useState({
//         userName: "",
//         userEmail: "",
//     });
//     const handleAddSection=()=>{
//       const updateSection=[...sections,{
//         designation: "",
//         Assigned_Group: [],
//         Reporting_To: "None"}]
//         setSections(updateSection)
//     }
//     useEffect(()=>{
//       const remRole = allRoles.filter(
//         (role) => !state.roles.map((item) => item.designation).includes(role))
//       ;
//       console.log(remRole,"reqc");
//       setRemainingRole(remRole);
//     },[])

//     console.log(remainingRole)
//     // Fetch group data on component mount
//     useEffect(() => {
//         (async () => {
//             await dispatch(getGroupData());
//         })();
//     }, [dispatch]);
//     const userInitialState=()=>{
//       const arr=[]
//       state.roles.map((item)=>{
//         const obj={
//           designation: "",
//           Assigned_Group: [],
//           Reporting_To: "None"
//         }
//         obj.designation=item.designation;
//         obj.Assigned_Group=item.Assigned_Group;
//         obj.Reporting_To=item.Reporting_To;
//         arr.push(obj);
//         console.log(arr);
//       })
//       return arr;
//     }
    
//     useEffect(() => {
//         setSections(userInitialState());
//       },[]);
//     console.log(sections,"yjyj")
//     const handleRoleDelete = async (userID,role) => {
//       try {
//         console.log(userID,role, "judju")
//         const data = {
//           "userID": userID,
//           "role":role
//         }
//         const response = await dispatch(DeleteUserRole(data));
//         if (response?.payload?.success) {
//           toast.success(`Role ${role} deleted successfully`);
//           navigate('/Admin/User/UserList')
//         }
//       } catch (error) {
//         toast.error(error)
//       }
//     }
//     console.log(fullName,email,"rijiju");
//     const handleRoleChange = (e, sectionIndex) => {
//       const {value}=e.target;
//       const updatedSection = [...sections];
      
//       updatedSection[sectionIndex].designation = value;
//   };

//   const handleGroupChange = (e, sectionIndex) => {
//     const {value}=e.target;
//       const updatedSection = [...sections];
//       updatedSection[sectionIndex].Assigned_Group = [value];
//       setSections(updatedSection);
//   };

//   const validateUserName = (name) => {
//     if (!name.trim()) return "User Name is required.";
//     if (name.length < 3) return "User Name must be at least 3 characters.";
//     return "";
// };

// const validateUserEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) return "Email is required.";
//     if (!emailRegex.test(email)) return "Enter a valid email.";
//     return "";
// };
// const validateSections = (sections) => {
//   const errors = [];
//   sections.forEach((section, index) => {
//           if (!section.designation && !section.Assigned_Group.length) {
//               errors.push(`Section ${index + 1}: Both Designation and Group are required.`);
//           } else if (!section.designation) {
//               errors.push(`Section ${index + 1}: Designation is required.`);
//           } else if (!section.Assigned_Group.length) {
//               errors.push(`Section ${index + 1}: Group is required.`);
//           }
//   });
//   return errors;
// };
// // Handle input changes with validation
// const handleNameChange = (e) => {
//   const value = e.target.value;
//   setFullName(value);
//   setErrors((prev) => ({ ...prev, userName: validateUserName(value) }));
// };

// const handleEmailChange = (e) => {
//   const value = e.target.value;
//   setEmail(value);
//   setErrors((prev) => ({ ...prev, userEmail: validateUserEmail(value) }));
// };
//   const handleEditSubmit=()=>{
//     const userNameError = validateUserName(fullName);
//     const userEmailError = validateUserEmail(email);
//     const sectionErrors = validateSections(sections);
  
//     if (userNameError || userEmailError || sectionErrors.length > 0) {
//         if (userNameError) toast.error(userNameError);
//         if (userEmailError) toast.error(userEmailError);
//         sectionErrors.forEach((error) => toast.error(error));
//         return;
//     }
//   }
//   return (
//     <div>
//         <div className='w-full flex border bg-gray-300 p-5'>
//             <div className='w-3/5 text-3xl font-bold pr-10'><span className='float-right'>Full Details Of User</span></div>
//             <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/User/UserList')}>Back</button></div>
//         </div>
//         <br />
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
//           <div>
//             <label className="block text-sm font-semibold mb-2">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
//               value={fullName}
//               onChange={handleNameChange}
//             />
//             {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
//           </div>
//           <div>
//             <label className="block text-sm font-semibold mb-2">Email</label>
//             <input
//               type="text"
//               name="Email"
//               className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
//               value={email}
//               onChange={handleEmailChange}
//             />
//             {errors.userEmail && <p className="text-red-500 text-sm">{errors.userEmail}</p>}
//           </div>  
//         </div>
//         <div className='p-2'>
//             <label className="block text-sm font-semibold mb-2 mt-2">ID</label>
//             <input
//               type="text"
//               name="UserID"
//               className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
//               defaultValue={state._id}
//               disabled={true}
//             />
//           </div>
//         <br />
//         <div className='p-2'>
//           <table className='table-auto w-full border-collapse border border-gray-300'>
//               <thead>
//                 <tr className="bg-slate-200">
//                     <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
//                     <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
//                     <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
//                     <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//               {
//                   sections?.map((item,index)=>{
//                     if(item.designation!=='' && item.Assigned_Group.length>0)
//                     return(
//                       <tr className="hover:bg-gray-100" key={`${item.desination}-${index}`} >
//                         <td className="border border-gray-300 px-4 py-2 text-center">{index+1}.</td>
//                         <td className="border border-gray-300 px-4 py-2 text-center">{item.designation}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-center">{item.Assigned_Group.toString()}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={()=>handleRoleDelete(state._id,item.designation)}><BsTrash /></button></td>
//                       </tr>
//                     )
//                     else
//                     return(
//                       <tr className="hover:bg-gray-100" key={`newSection-${index}`} >
//                         <td className="border border-gray-300 px-4 py-2 text-center">{index+1}.</td>
//                         <td className="border border-gray-300 px-4 py-2 text-center">
//                           <select name={`name-${item.designation}-${index}`} id={`name-${item.designation}-${index}`} className='bg-slate-100 py-1 w-3/4 border-2 border-blue-700'  onChange={(e)=>handleRoleChange(e,index)}>
//                             <option value="">Role</option>
//                             {
//                             remainingRole.map((role,i)=>{
//                               return <option value={role} key={`remainingRole-${role}-${i}`}>{role}</option>
//                             })
//                             }
//                           </select>
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2 text-center">
//                         <select name="" id="" className='bg-slate-100 py-1 w-3/4 border-2 border-blue-700' onChange={()=>handleGroupChange(e,index)}>
//                             <option value="">Group</option>
//                             {
//                             groupData.map((group,grpi)=>{
//                               return <option value={group.Group_Name} key={`Group-${group.Group_Name}-${grpi}`}>{group.Group_Name}</option>
//                             })
//                             }
//                           </select>
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2 text-center">______</td>
//                       </tr>
//                     )
//                   })
//                 }
//               </tbody>
//             </table>
//             {
//               sections?.length>=4?(
//                 <span className='w-0'></span>
//               ):(
//                 <div className='w-screen py-2 border border-gray-300'><button className='flex justify-center m-auto bg-green-600 text-white py-1 px-4 text-sm rounded hover:bg-green-700 font-semibold' onClick={handleAddSection}>Add Role</button></div>
//               )
//             }
//         </div>
//         <br /><br /><br />
//         <div className='w-full mb-20'><button type="button" className='bg-indigo-700 text-lg py-1 font-semibold rounded-md text-white float-center flex justify-center mx-auto w-1/5 hover:bg-indigo-900' onClick={handleEditSubmit}>Edit</button></div>
//     </div>
//   )
// }

// export default UserListViewMore







import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import { DeleteUserRole } from '../../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupData } from '../../../Redux/Slices/GroupSilce';

const UserListViewMore = () => {
    const {state}=useLocation();
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const { groupData } = useSelector((state) => state.group);
    const [sections, setSections] = useState([]);
    const [fullName, setFullName] = useState(state.fullName);
    const [email, setEmail] = useState(state.email);
    const [allRoles] = useState(["Technical Manager", "Analyst", "Sample Review", "Sample Registration"]);
    const [remainingRole, setRemainingRole] = useState([]);
    const [errors, setErrors] = useState({
        userName: "",
        userEmail: "",
    });

    const getAvailableRoles = (sectionIndex) => {
        const selectedRoles = sections.map((section) => section.designation);
        return allRoles.filter((role) => !selectedRoles.includes(role) || sections[sectionIndex].designation === role);
    };

    const handleAddSection = () => {
        const updateSection = [...sections, {
            designation: "",
            Assigned_Group: [],
            Reporting_To: "None"
        }];
        setSections(updateSection);
    };

    useEffect(() => {
        const remRole = allRoles.filter(
            (role) => !state.roles.map((item) => item.designation).includes(role)
        );
        setRemainingRole(remRole);
    }, []);

    useEffect(() => {
        (async () => {
            await dispatch(getGroupData());
        })();
    }, [dispatch]);

    const userInitialState = () => {
        const arr = [];
        state.roles.map((item) => {
            const obj = {
                designation: "",
                Assigned_Group: [],
                Reporting_To: "None"
            };
            obj.designation = item.designation;
            obj.Assigned_Group = item.Assigned_Group;
            obj.Reporting_To = item.Reporting_To;
            arr.push(obj);
        });
        return arr;
    }

    useEffect(() => {
        setSections(userInitialState());
    }, []);

    const handleRoleDelete = async (userID, role) => {
        try {
            const data = {
                "userID": userID,
                "role": role
            };
            const response = await dispatch(DeleteUserRole(data));
            if (response?.payload?.success) {
                toast.success(`Role ${role} deleted successfully`);
                navigate('/Admin/User/UserList');
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleRoleChange = (e, sectionIndex) => {
        const { value } = e.target;
        const updatedSection = [...sections];
        updatedSection[sectionIndex].designation = value;
        setSections(updatedSection);
    };

    const handleGroupChange = (e, sectionIndex) => {
        const { value } = e.target;
        const updatedSection = [...sections];
        updatedSection[sectionIndex].Assigned_Group = [value];
        setSections(updatedSection);
    };

    const validateUserName = (name) => {
        if (!name.trim()) return "User Name is required.";
        if (name.length < 3) return "User Name must be at least 3 characters.";
        return "";
    };

    const validateUserEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) return "Email is required.";
        if (!emailRegex.test(email)) return "Enter a valid email.";
        return "";
    };

    const validateSections = (sections) => {
        const errors = [];
        sections.forEach((section, index) => {
            if (!section.designation && !section.Assigned_Group.length) {
                errors.push(`Section ${index + 1}: Both Designation and Group are required.`);
            } else if (!section.designation) {
                errors.push(`Section ${index + 1}: Designation is required.`);
            } else if (!section.Assigned_Group.length) {
                errors.push(`Section ${index + 1}: Group is required.`);
            }
        });
        return errors;
    };

    // Handle input changes with validation
    const handleNameChange = (e) => {
        const value = e.target.value;
        setFullName(value);
        setErrors((prev) => ({ ...prev, userName: validateUserName(value) }));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({ ...prev, userEmail: validateUserEmail(value) }));
    };

    const handleEditSubmit = () => {
        const userNameError = validateUserName(fullName);
        const userEmailError = validateUserEmail(email);
        const sectionErrors = validateSections(sections);

        if (userNameError || userEmailError || sectionErrors.length > 0) {
            if (userNameError) toast.error(userNameError);
            if (userEmailError) toast.error(userEmailError);
            sectionErrors.forEach((error) => toast.error(error));
            return;
        }
    };

    return (
        <div>
            <div className='w-full flex border bg-gray-300 p-5'>
                <div className='w-3/5 text-3xl font-bold pr-10'><span className='float-right'>Full Details Of User</span></div>
                <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={() => navigate('/Admin/User/UserList')}>Back</button></div>
            </div>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
                        value={fullName}
                        onChange={handleNameChange}
                    />
                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                        type="text"
                        name="Email"
                        className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {errors.userEmail && <p className="text-red-500 text-sm">{errors.userEmail}</p>}
                </div>
            </div>
            <div className='p-2'>
                <label className="block text-sm font-semibold mb-2 mt-2">ID</label>
                <input
                    type="text"
                    name="UserID"
                    className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
                    defaultValue={state._id}
                    disabled={true}
                />
            </div>
            <br />
            <div className='p-2'>
                <table className='table-auto w-full border-collapse border border-gray-300'>
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections?.map((item, index) => {
                            if (item.designation !== '' && item.Assigned_Group.length > 0)
                                return (
                                    <tr className="hover:bg-gray-100" key={`${item.designation}-${index}`}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.designation}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Assigned_Group.toString()}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleRoleDelete(state._id, item.designation)}>
                                                <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            else
                                return (
                                    <tr className="hover:bg-gray-100" key={`newSection-${index}`}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <select name={`name-${item.designation}-${index}`} id={`name-${item.designation}-${index}`} className='bg-slate-100 py-1 w-3/4 border-2 border-blue-700' onChange={(e) => handleRoleChange(e, index)}>
                                                <option value="">Role</option>
                                                {getAvailableRoles(index).map((role, i) => (
                                                    <option value={role} key={`remainingRole-${role}-${i}`}>{role}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <select name="" id="" className='bg-slate-100 py-1 w-3/4 border-2 border-blue-700' onChange={(e) => handleGroupChange(e, index)}>
                                                <option value="">Group</option>
                                                {groupData.map((group, grpi) => (
                                                    <option value={group.Group_Name} key={`Group-${group.Group_Name}-${grpi}`}>{group.Group_Name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">______</td>
                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
                {sections?.length >= 4 ? (
                    <span className='w-0'></span>
                ) : (
                    <div className='w-screen py-2 border border-gray-300'>
                        <button className='flex justify-center m-auto bg-green-600 text-white py-1 px-4 text-sm rounded hover:bg-green-700 font-semibold' onClick={handleAddSection}>Add Role</button>
                    </div>
                )}
            </div>
            <br /><br /><br />
            <div className='w-full mb-20'>
                <button type="button" className='bg-indigo-700 text-lg py-1 font-semibold rounded-md text-white float-center flex justify-center mx-auto w-1/5 hover:bg-indigo-900' onClick={handleEditSubmit}>Edit</button>
            </div>
        </div>
    );
};

export default UserListViewMore;
