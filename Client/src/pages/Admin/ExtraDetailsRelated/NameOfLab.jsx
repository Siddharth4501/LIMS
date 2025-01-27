import React from 'react'
import AdminCommomNav from '../../../components/AdminCommomNav'
import AdminCommonPanel from '../../../components/AdminCommonPanel'

const NameOfLab = () => {
  return (
    <>
          <AdminCommomNav />
          <div className='flex'>
              <AdminCommonPanel/>
              <div className='w-full'>
                <br /><br /><br /><br /><br />
                  <div className='flex flex-col gap-2 w-1/2 justify-center m-auto h-72 border-2 bg-slate-300 border-2 border-blue-700 items-center'>
                    <div className='text-xl font-semibold'>Name Of Lab:</div>
                    <div className='w-full'><input type="text" placeholder='Enter Name Of Lab...' className='w-3/4 flex justify-center mx-auto h-8 p-2 border-2 bg-slate-100 border-blue-600 font-semibold outline-0' /></div>
                    <div><button className='px-4 py-1 bg-indigo-700 hover:bg-indigo-900 text-white rounded-md mt-1'>Submit</button></div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default NameOfLab