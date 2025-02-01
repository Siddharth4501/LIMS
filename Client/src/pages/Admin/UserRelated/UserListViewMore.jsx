
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import { DeleteUserRole, getAllUserData, UpdateUser } from '../../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupData } from '../../../Redux/Slices/GroupSilce';

const UserListViewMore = () => {
    const {state}=useLocation();
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const { groupData } = useSelector((state) => state.group);
    const { allUserData } = useSelector((state) => state.auth);
    const [allUserDataState,setAllUserDataState]=useState([])
    const [sections, setSections] = useState([]);
    const [fullName, setFullName] = useState(state.fullName);
    const [email, setEmail] = useState(state.email);
    const [allRoles] = useState(["Technical Manager", "Analyst", "Sample Review", "Sample Registration"]);
    const [prevRoles,setPrevRoles]=useState([]);
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
        const roles=state.roles.map((role)=>role.designation);
        setPrevRoles(roles);
    }, []);
    console.log(sections,"olr")
    useEffect(() => {
        (async () => {
            await dispatch(getGroupData());
        })();
    }, [dispatch]);
    useEffect(() => {
      (async () => {
          await dispatch(getAllUserData());
          
      })();
    }, [dispatch]);
    useEffect(() => {
        setAllUserDataState(allUserData);
    }, [allUserData])
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
            if(sections.length===1){
                toast.error("At Least One Role Should Be Assigned To A User");
                return
            }
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
        if (value==='Sample Registration'){
          handleGroupChange("All",sectionIndex)
        }
        if(value==='Technical Manager'){
            const existingGroup=updatedSection[sectionIndex].Assigned_Group[0] || ''
            const find=allUserDataState.find((user)=> user.roles.some((role)=>role.designation==='Technical Manager' && role.Assigned_Group.includes(existingGroup)))
            if(find){
                toast.error(`Technical Manager For the group ${existingGroup} already exist`)
                return
            }
        }
        updatedSection[sectionIndex].designation = value;
        setSections(updatedSection);
    };

    const handleGroupChange = (group, sectionIndex) => {
        const updatedSection = [...sections];
        if(updatedSection[sectionIndex].designation==='Technical Manager'){
          const find=allUserDataState.find((user)=> user.roles.some((role)=>role.designation==='Technical Manager' && role.Assigned_Group.includes(group)))
          if(find){
              toast.error(`Technical Manager For the group ${group} already exist`)
              return
          }
        }
        updatedSection[sectionIndex].Assigned_Group = [group];
        setSections(updatedSection);
    };

    const handleRepToChange = (RepTo, sectionIndex) => {
      const updatedSection = [...sections];
      updatedSection[sectionIndex].Reporting_To = RepTo;
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

    const handleEditSubmit = async() => {
        const userNameError = validateUserName(fullName);
        const userEmailError = validateUserEmail(email);
        const sectionErrors = validateSections(sections);

        if (userNameError || userEmailError || sectionErrors.length > 0) {
            if (userNameError) toast.error(userNameError);
            if (userEmailError) toast.error(userEmailError);
            sectionErrors.forEach((error) => toast.error(error));
            return;
        }

        const data={
          "roles":sections,
          "fullName":fullName,
          "email":email,
          "userID":state._id
        }
        
        try {
          const res = await dispatch(UpdateUser(data));
          if (res?.payload?.success) {
              toast.success(`User ${fullName} Successfully Updata`);
              navigate("/Admin/User/UserList");
          }
        } catch (error) {
            toast.error(error?.message || "An error occurred.");
        }
    };

    return (
        <div>
            <div className='w-full flex border bg-gray-300 p-5'>
                <div className='w-3/5 text-3xl font-bold pr-10'><span className='float-right'>Full Details Of User</span></div>
                <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={() => navigate('/Admin/User/UserList')}>Back</button></div>
            </div>
            <br />
            <div className='p-2'>
                <label className="block text-sm font-semibold mb-2 mt-2">ID</label>
                <input
                    type="text"
                    name="UserID"
                    className="w-full border-2 border-blue-600 bg-slate-100 rounded-md p-2 outline-0"
                    defaultValue={state._id}
                    disabled={true}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        className="w-full border-2 border-blue-600 bg-slate-100 rounded-md p-2 outline-0"
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
                        className="w-full border-2 border-blue-600 bg-slate-100 rounded-md p-2 outline-0 "
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {errors.userEmail && <p className="text-red-500 text-sm">{errors.userEmail}</p>}
                </div>
            </div>
            
            <br />
            <div className='p-2'>
                <table className='table-auto w-full border-collapse border border-gray-300'>
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Role</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                            <th className='border border-gray-300 px-4 py-2 text-center'>Reporting To</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections?.map((item, index) => {
                            if (prevRoles.includes(item.designation))
                                return (
                                    <tr className="hover:bg-gray-100" key={`${item.designation}-${index}`}>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.designation}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Assigned_Group.toString()}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">______</td>
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
                                            <select name={`name-${item.designation}-${index}`} id={`name-${item.designation}-${index}`} value={item.designation || ''} className='bg-slate-100 py-1 w-3/4 border-2 border-blue-700 outline-0' onChange={(e) => handleRoleChange(e, index)}>
                                                <option value="">Role</option>
                                                {getAvailableRoles(index).map((role, i) => (
                                                    <option value={role} key={`remainingRole-${role}-${i}`}>{role}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                        {
                                          item.designation==='Sample Registration'?(
                                            <span className="">______</span>        
                                          ):(
                                            <select name="" id="" className='bg-slate-100 py-1 w-3/4 border-2 border-blue-700 outline-0' value={item.Assigned_Group[0] || ''} onChange={(e) => handleGroupChange(e.target.value, index)}>
                                                <option value="">Group</option>
                                                {groupData.map((group, grpi) => (
                                                    <option value={group.Group_Name} key={`Group-${group.Group_Name}-${grpi}`}>{group.Group_Name}</option>
                                                ))}
                                            </select>
                                          )}
                                        </td>
                                        {
                                          item.designation==='Sample Review'?(
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                              <select name="" id="" className='bg-slate-100 py-1 w-3/4 border-2 border-blue-700 outline-0' value="Technical Manager" onChange={(e) => handleRepToChange("Technical Manager", index)}>
                                                <option value="">Reporting To</option>
                                                <option value="Technical Manager" key={`RepTo-Technical Manager-${index}`}>Technical Manager</option>

                                              </select>
                                            </td>
                                          ):
                                          (
                                            <td className='border border-gray-300 px-4 py-2 text-center'>______</td>
                                          )
                                        }
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
                <button type="button" className='bg-indigo-700 text-lg py-1 font-semibold rounded-md text-white float-center flex justify-center mx-auto w-1/5 hover:bg-indigo-900' onClick={handleEditSubmit}>Edit Details</button>
            </div>
        </div>
    );
};

export default UserListViewMore;

