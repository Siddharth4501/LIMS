import React from 'react'
import AdminCommomNav from '../../../components/AdminCommomNav'
import AdminCommonPanel from '../../../components/AdminCommonPanel'

const AdministratorProfile = () => {
  const userData=JSON.parse(localStorage.getItem("userData"));
  return (
    <>
    <div className="min-h-screen w-screen bg-[url('/src/assets/images/DRDODIBT-BACK.png')] bg-cover bg-center bg-fixed">

        <AdminCommomNav />
        <div className='flex'>
            <AdminCommonPanel/>
            <div className='w-full'>
            <div className="min-h-[84vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white sm:min-w-80 min-w-[70vw] shadow-[0_0_6px_gray] bg-gray-200 border-2 border-blue-700">
                  <img
                    className="sm:w-32 w-20 m-auto rounded-full border border-black bg-gray-300" 
                    src='/src/assets/images/userProfileLogo.jpg'
                    alt="user profile image"
                  />

                  <h3 className="text-xl font-semibold text-center capitalize text-black">
                    {userData?.fullName}
                  </h3>

                  <div className="grid sm:grid-cols-2 text-black">
                    <p className='text-lg font-semibold'>Email :</p>
                    <p className='text-lg'>{userData?.email}</p>
                    <p className='text-lg font-semibold'>Role :</p>
                    <p className='text-lg'>Admin</p>
                    <p className='text-lg font-semibold'>Status:</p>
                    <p className='text-lg text-green-600 font-semibold'>Active</p>
                  </div>

                  {/* button to change the password */}
                  <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
                    {/* <Link
                      to={
                        userData?.email === "test@gmail.com"
                          ? "/denied"
                          : "/changepassword"
                      }
                      className="sm:w-1/2 w-full bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
                    >
                      <button>Change Password</button>
                    </Link> */}

                    {/* <Link
                      to={
                        userData?.email === "test@gmail.com"
                          ? "/denied"
                          : "/user/editprofile"
                      }
                      className="sm:w-1/2 w-full border border-yellow-600 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2  font-semibold cursor-pointer text-center"
                    >
                      <button>Edit Profile</button>
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdministratorProfile