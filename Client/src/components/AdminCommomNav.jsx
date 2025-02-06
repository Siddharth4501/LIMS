import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/AuthSlice';
import { getLogo, getNameOfLab } from '../Redux/Slices/ExtraSlice';

const AdminCommomNav = () => {
    const {LabNameData,logoData}=useSelector(state=>state.administration)
    const [LabNameDataState,setLabNameDataState]=useState([]);
    const [logoDataState,setLogoDataState]=useState([]);
    const dispatch=useDispatch();
    const navigate=useNavigate();
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
    const handleAdminNavigation=async(e)=>{
        const {value}=e.target;
        console.log(value,"frt")
        if(value==="AdminHome"){
            navigate('/Admin/Home');
        }
        else if(value==='logout'){
            const res=await dispatch(logout())
            if(res?.payload?.success){
                navigate('/Login')
                toast.success("Successfully Logged Out");
                
            }
            else{
                toast.error("Something Went Wrong");
            }
        }
        else if(value=='change-password'){
            navigate('/User/Change-Password')
        }
    }
  return (
      <div className="flex items-center justify-between p-4 shadow-md bg-slate-500 border-slate-700 border-2">
                <div className="flex items-center">
                    <img src={logoDataState.length>0?`http://localhost:5001${logoDataState[0]?.imageUrl}`:''} alt="Logo"
                        className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
                    />
                    <span className="text-lg text-gray-200 font-bold">Name of Lab : {LabNameDataState.length>0?LabNameDataState[0].Lab_Name:'DIBT'} </span>
                </div>
                <div className='mx-6'>
                    <select name="" id="" className="p-2 rounded-lg border-2 border-blue-600 outline-0" onChange={handleAdminNavigation}>
                        <option value="admin">Administrator</option>
                        <option value="AdminHome">Home</option>
                        <option value="change-password">Change Password</option>
                        <option value="logout" className='text-red-500'>Log Out!</option>
                    </select>
                </div>
            </div>
  )
}

export default AdminCommomNav
