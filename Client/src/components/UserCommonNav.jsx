import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import { getLogo, getNameOfLab } from '../Redux/Slices/ExtraSlice';

const UserCommonNav = ({assignedRole}) => {
    const {LabNameData,logoData}=useSelector(state=>state.administration)
    const [LabNameDataState,setLabNameDataState]=useState([]);
    const [logoDataState,setLogoDataState]=useState([]);
    useEffect(() => {
        (async () => {
          await dispatch(getNameOfLab());
          await dispatch(getLogo());
        })();
      }, []);
    useEffect(() => {
        setLabNameDataState(LabNameData);
    }, [LabNameData]);
    useEffect(() => {
        setLogoDataState(logoData);
    }, [logoData]);
    const userData=JSON.parse(localStorage.getItem('userData'));
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const handleChange = (event) => {
        const role = event.target.value;
        setSelectedRole(role); // Update the selected role
        navigate(`/${role}/Home`); // Navigate to the dynamic route
    };
    const handleLogout=async(e)=>{
        const value=e.target.value;
        if(value==='logout'){
            const res=await dispatch(logout())
            if(res?.payload?.success){
                navigate('/Login')
                toast.success("Successfully Logged Out");
                
            }
            else{
                toast.error("Something Went Wrong");
            }
        }
        else if(value=='change-password')
            navigate('/User/Change-Password')
        else if (value === 'User Home') {
            navigate('/')
        }
    }
  return (
    <div className="flex lg:flex-row flex-col items-center justify-between p-4 shadow-md bg-slate-500 border border-2 border-slate-800">

        <div className="flex items-center">
            <img src={logoDataState.length>0?`http://localhost:5001${logoDataState[0]?.imageUrl}`:''} alt="Logo"
                className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
            />
            <span className="text-lg text-gray-200 font-bold">Name of Lab : {LabNameDataState.length>0?LabNameDataState[0].Lab_Name:'DIBT'} </span>
        </div>
        {
            assignedRole ? <div className='text-gray-200 text-2xl w-1/3 font-bold pr-6'><span className='flex justify-end'>{`${assignedRole} Section`}</span></div> : <span></span>
        }
        
        <div className='flex sm:flex-row flex-col '>
            <div className='pt-2 text-gray-200 text-lg font-bold lg:mx-0 mx-auto'>Change Role:</div>
            <div className='px-2 mr-6 lg:ml-0 ml-5 mb-1'>
                <select name="" id="" className="p-2 rounded-lg border-2 outline-0 border-blue-600" value={selectedRole} onChange={handleChange}>
                    <option value="" className='cursor-not-allowed' disabled>Select a role</option>
                    {
                        userData.roles.map((item)=>{
                            return <option value={item.designation} key={item._id}>{item.designation}</option>
                        })
                    }
                </select>
            </div>
            <div className='lg:mx-6 mx-auto'>
                <select name="" id="" className="p-2 rounded-lg border-2 outline-0 border-blue-600" onChange={handleLogout}>
                    <option value={userData.fullName}>{userData.fullName.toUpperCase()}</option>
                    <option value="User Home">Home</option>
                    <option value="change-password">Change Password</option>
                    <option value="logout" className='text-red-500'>Log Out!</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default UserCommonNav