
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupData } from "../../../Redux/Slices/GroupSilce";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createAccount, getAllUserData } from "../../../Redux/Slices/AuthSlice";
import AdminCommomNav from "../../../components/AdminCommomNav";

const AddUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { groupData } = useSelector((state) => state.group);
    const { allUserData } = useSelector((state) => state.auth);
    // State for form fields
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
    });

    // Initial roles
    const [allRoles] = useState(["Technical Manager", "Analyst", "Sample Review","Sample Registration"]);

    // State for sections
    const [sections, setSections] = useState([
        { designation: "", Assigned_Group: [], Reporting_To: "None" },
    ]);

    // Fetch group data on component mount
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
    console.log(allUserData,"ju")
    const getAvailableRoles = (sectionIndex) => {
        const selectedRoles = sections.map((section) => section.designation);
    
        // Get the list of all assigned "Technical Manager" roles
        const assignedTechnicalManagers = allUserData
            .flatMap((user) =>
                user.roles.filter((item) => item.designation === "Technical Manager")
            )
            .map((role) => role.Assigned_Group[0]);
    
        console.log(assignedTechnicalManagers, "zebra");
    
        // Check if a designation other than "Technical Manager" is selected in the first section
        // const isNonTechnicalManagerSelectedInFirstSection =
        //     sections[0].designation && sections[0].designation !== "Technical Manager";
    
        return allRoles
            .filter((role) => {
                // Exclude "Technical Manager" if:
                // 1. All technical managers are already assigned
                if (role === "Technical Manager") {
                    if (assignedTechnicalManagers.length === groupData.length) {
                        return false;
                    }
                }
                return true;
            })
            .filter((role) => {
                // Ensures role is not already selected for this section unless it's explicitly chosen
                return !selectedRoles.includes(role) || selectedRoles[sectionIndex] === role;
            });
    };
    

    // Validation Functions
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

    const validateUserPassword = (password) => {
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const lowercaseRegex = /[a-z]/;
        const uppercaseStartRegex = /^[A-Z]/;

        if (!password) {
            return "Password is required.";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters.";
        }
        if (!uppercaseStartRegex.test(password)) {
            return "Password must start with a capital letter.";
        }
        if (!specialCharacterRegex.test(password)) {
            return "Password must contain at least one special character.";
        }
        if (!lowercaseRegex.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
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
        setUserName(value);
        setErrors((prev) => ({ ...prev, userName: validateUserName(value) }));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setUserEmail(value);
        setErrors((prev) => ({ ...prev, userEmail: validateUserEmail(value) }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setUserPassword(value);
        setErrors((prev) => ({ ...prev, userPassword: validateUserPassword(value) }));
    };

    // Handle roles and groups
    const handleRoleChange = (role, sectionIndex) => {
        const updatedSections = [...sections];
        if (role==='Sample Registration'){
            handleGroupChange("All",sectionIndex)
        }
        if(role==='Technical Manager'){
            const existingGroup=updatedSections[sectionIndex].Assigned_Group[0] || ''
            const find=allUserData.find((user)=> user.roles.some((role)=>role.designation==='Technical Manager' && role.Assigned_Group.includes(existingGroup)))
            if(find){
                toast.error(`Technical Manager For the group ${existingGroup} already exist`)
                return
            }
        }
        updatedSections[sectionIndex].designation = role;
        setSections(updatedSections);
    };

    const handleGroupChange = (group, sectionIndex) => {
        const updatedSections = [...sections];
        if(updatedSections[sectionIndex].designation==='Technical Manager'){
            const find=allUserData.find((user)=> user.roles.some((role)=>role.designation==='Technical Manager' && role.Assigned_Group.includes(group)))
            if(find){
                toast.error(`Technical Manager For the group ${group} already exist`)
                return
            }
        }
        updatedSections[sectionIndex].Assigned_Group = [group];
        setSections(updatedSections);
    };

    const handleRepToChange = (RepTo, sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].Reporting_To = RepTo;
        setSections(updatedSections);
    };

    const handleAddMore = () => {
        setSections([...sections, { designation: "", Assigned_Group: [], Reporting_To: "None" }]);
    };

    // Handle form submission
    const handleSubmit = async () => {
        const userNameError = validateUserName(userName);
        const userEmailError = validateUserEmail(userEmail);
        const userPasswordError = validateUserPassword(userPassword);
        const sectionErrors = validateSections(sections);

        if (userNameError || userEmailError || userPasswordError || sectionErrors.length > 0) {
            if (userNameError) toast.error(userNameError);
            if (userEmailError) toast.error(userEmailError);
            if (userPasswordError) toast.error(userPasswordError);
            sectionErrors.forEach((error) => toast.error(error));
            return;
        }
        const data = {
                fullName: userName,
                email: userEmail,
                password: userPassword,
                roles: sections,
            };

        try {
            const res = await dispatch(createAccount(data));
            if (res?.payload?.success) {
                toast.success("User Successfully Created");
                navigate("/Admin/User/UserList");
            }
        } catch (error) {
            toast.error(error?.message || "An error occurred.");
        }
    };
    console.log(sections,"hell1");
    return (
        <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center">
            {/* Header */}
                <AdminCommomNav/>
                <div className="w-full p-4">
                    <button
                        className="bg-indigo-700 px-8 py-1 text-white rounded-md float-right"
                        onClick={() => navigate("/Admin/User/UserList")}
                    >
                        Back
                    </button>
                </div>
            <br /><br />
            {/* Form */}
            <div className="p-6  flex flex-col items-center justify-center">
                <div className="w-full bg-white border border-gray-700 shadow-lg rounded-lg p-8">
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={handleNameChange}
                                className="mt-1 block w-full p-2 border-blue-500 border-2 rounded-md"
                            />
                            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                        </div>
                        <div>
                            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">User Email<span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                id="userEmail"
                                value={userEmail}
                                onChange={handleEmailChange}
                                className="mt-1 block w-full p-2 border-blue-500 border-2 rounded-md"
                            />
                            {errors.userEmail && <p className="text-red-500 text-sm">{errors.userEmail}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password<span className="text-red-500">*</span></label>
                            <input
                                type="password"
                                id="password"
                                value={userPassword}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full p-2 border-blue-500 border-2 rounded-md"
                            />
                            {errors.userPassword && <p className="text-red-500 text-sm">{errors.userPassword}</p>}
                        </div>
                    </div>
                    {sections.map((section, i) => (
                        <div className="grid grid-cols-3 gap-6 mb-4 border-blue-500 border-2 rounded-md" key={i}>
                            {/* Role Section */}
                            <div className="p-4 ">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role<span className="text-red-500">*</span>
                                </label>
                                <div>
                                    {getAvailableRoles(i).map((role) => (
                                        <div key={role}>
                                            <input
                                                type="radio"
                                                id={`${role}-${i}`}
                                                name={`role-${i}`}
                                                className="mr-2"
                                                required
                                                checked={sections[i].designation === role}
                                                onChange={() => handleRoleChange(role, i)}
                                            />
                                            <label
                                                htmlFor={`${role}-${i}`}
                                                className="text-gray-700"
                                            >
                                                {role}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Group Section */}
                            {
                                section.designation==='Sample Registration'?(
                                   <span className=""></span>        
                                ):(
                                    <div className="p-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Group<span className="text-red-500">*</span>
                                        </label>
                                        <div className={groupData.length > 4 ? "max-h-32 overflow-y-auto" : ""}>
                                            {groupData.map((item) => (
                                                <div key={item._id}>
                                                    <input
                                                        type="radio"
                                                        id={item.Group_Name}
                                                        name={`group-${i}`}
                                                        className="mr-2"
                                                        checked={
                                                            sections[i].Assigned_Group[0] === item.Group_Name
                                                        }
                                                        onChange={() => handleGroupChange(item.Group_Name, i)}
                                                    />
                                                    <label
                                                        htmlFor={item.Group_Name}
                                                        className="text-gray-700"
                                                    >
                                                        {item.Group_Name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }

                            {/* Reporting To Section */}
                            {
                                section.designation==='Sample Review'?(
                                    <div className="p-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Reporting To:
                                        </label>
                                        <div>
                                            <input type="checkbox" checked={
                                                    sections[i].Reporting_To === 'Technical Manager'
                                                } onChange={() => handleRepToChange('Technical Manager', i)} className="mr-2" />
                                            <label className="text-gray-700">Technical Manager</label>
                                        </div>
                                    </div>
                                ):(
                                    <span className="w-0"></span>
                                )
                            }
                           
                        </div>
                    ))}
                    {
                        sections.length>=4 ?<span className="w-0"></span>:(
                            <div className="w-full mt-2">
                                <button
                                    type="button"
                                    onClick={handleAddMore}
                                    className="text-sm text-white bg-green-500 py-1 px-4 float-right rounded-md"
                                >
                                    Add Role
                                </button>
                            </div>
                        )
                    }
                    {/* Additional form sections go here */}

                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            className="bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
