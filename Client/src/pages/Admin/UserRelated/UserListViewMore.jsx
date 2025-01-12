import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {  BsTrash } from "react-icons/bs";

const UserListViewMore = () => {
    const {state}=useLocation();
    const navigate=useNavigate();
    console.log(state);
  return (
    <div>
        <div className='w-full flex border bg-gray-300 p-5'>
            <div className='w-3/5 text-3xl font-bold pr-10'><span className='float-right'>Full Details Of User</span></div>
            <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/User/UserList')}>Back</button></div>
        </div>
        <br /><br />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.fullName}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="text"
              name="Email"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.email}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">ID</label>
            <input
              type="text"
              name="UserID"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state._id}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="string"
              name="Registration_Number"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.password}
              disabled={true}
            />
          </div>
          {/* <div>
            <label className="block text-sm font-semibold mb-2">Registration Number</label>
            <input
              type="number"
              name="Registration_Number"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Registration_Number}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Customer Code</label>
            <input
              type="number"
              name="Customer_Code"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Customer_Code}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Packing Type</label>
            <select
              name="Packing_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            >
              <option defaultValue={state.Packing_Type}>{state.Packing_Type}</option>
              
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="text"
              name="Date"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Date.split('T')[0]}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Treatment Type</label>
            <input
              type="text"
              name="Treatment_Type"
              className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
              defaultValue={state.Treatment_Type}
              disabled={true}
            />
          </div>
          <div>
          <label className="block text-sm font-semibold mb-2">Nature Of Sample</label>
          <input
            type="text"
            name="Nature_Of_Sample"
            className="w-full border border-gray-300 bg-slate-100 rounded-md p-2"
            defaultValue={state.Nature_Of_Sample}
            disabled={true}
          />
          </div> */}
          
        </div>
        <br />
        <div>
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
              {
                  state.roles?.map((item,index)=>{
                    
                    return(
                      <tr className="hover:bg-gray-100" key={`${item.desination}`} >
                        <td className="border border-gray-300 px-4 py-2 text-center">{index+1}.</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item.designation}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item.Assigned_Group.toString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800'><BsTrash /></button></td>
                      </tr>
                    )
                    })
                  }
                  
              </tbody>
            </table>
        </div>
        <br /><br /><br />
        <div className='w-full mb-20'><button type="button" className='bg-indigo-700 text-lg py-1 font-semibold rounded-md text-white float-center flex justify-center mx-auto w-1/5 hover:bg-indigo-900'>Edit</button></div>
    </div>
  )
}

export default UserListViewMore