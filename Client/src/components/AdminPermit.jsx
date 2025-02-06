import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserData } from '../Redux/Slices/AuthSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminPermit = () => {
    const { allUserData } = useSelector((state) => state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const [allUserDataState, setAllUserDataState] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        (async () => {
          await dispatch(getAllUserData());
        })();
      }, []);
    useEffect(() => {
        setAllUserDataState(allUserData);
    },[allUserData])
    const handleSubmit=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const formData=new FormData(e.target);
        const password = formData.get("verificationPassword");
        console.log("vfedw",password)
        // Validate fields
        if (!password) {
            toast.error("Please fill all the fields");
            return;
        }
        const foundItem=allUserDataState?.find((element)=>element.Admin===true);
        console.log(foundItem,"difjwj");
        if(password===foundItem.VerificationPassword){
            setIsAuthenticated(true); // Update state
        }
        else{
            toast.error("Invalid Password");
            navigate('Admin/Home');     
        }

    }
  return (
    <>
        {
        !isAuthenticated?(

            <div className="flex justify-center m-auto min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">
                <form className='flex flex-col gap-5 justify-center m-auto w-1/2 h-80 bg-gray-200 border-2 border-blue-600' onSubmit={handleSubmit}>
                    <div className='flex flex-col w-4/5 gap-3 justify-center mx-auto' >
                        <div className='w-full text-center font-bold text-xl'>Enter Verification Password:</div>
                        <div className='w-full'><input type="password" placeholder='Enter Verification Password...' name='verificationPassword' className='w-full border-2 border-blue-600 h-8 rounded pl-2'/></div>
                    </div>
                    <div className='w-full'>
                        <button type="submit" className='bg-indigo-700 text-md text-white px-8 py-1 rounded-md flex justify-center mx-auto'>Submit</button>
                    </div>
                </form>
            </div>
        ):
        (
            <Outlet/>
        )
    }
    </>
  )
}

export default AdminPermit