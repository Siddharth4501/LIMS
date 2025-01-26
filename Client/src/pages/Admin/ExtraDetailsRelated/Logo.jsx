import React from 'react'
import AdminCommomNav from '../../../components/AdminCommomNav'
import AdminCommonPanel from '../../../components/AdminCommonPanel'

const Logo = () => {
  return (
      <>
          <AdminCommomNav />
          <div className='flex'>
              <AdminCommonPanel/>
              <div className='w-full'>

              </div>
          </div>
      </>
  )
}

export default Logo