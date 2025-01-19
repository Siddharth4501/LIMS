import React from 'react'

const AdminCommomNav = () => {
  return (
      <div className="flex items-center justify-between p-4 shadow-md bg-slate-400 border-slate-700 border-2">
                <div className="flex items-center">
                    <img src=" /src/assets/images/DRDO-Logo1.jpg" alt="Logo"
                        className="h-20 w-22 object-contain mr-8 ml-4 rounded-full"
                    />
                    <span className="text-lg font-bold">Name of Lab : DFRL</span>
                </div>
                <div className='mx-6'>
                    <select name="" id="" className="p-2 rounded-lg border border-blue-800 bg-slate-100">
                        <option value="admin">Administrator</option>
                        <option value="change-password">Change Password</option>
                        <option value="logout" className='text-red-500'>Log Out!</option>
                    </select>
                </div>
            </div>
  )
}

export default AdminCommomNav
