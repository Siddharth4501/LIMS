import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllUserData } from '../../../Redux/Slices/AuthSlice';
import { all } from 'axios';
import {  BsTrash } from "react-icons/bs";

const UserList = () => {
    const {allUserData}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [allUserDataState,setAllUserDataState]=useState([]);
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    useEffect(() => {
      const filtered = allUserData.filter(item =>
        item.fullName.toLowerCase().includes(query.toLowerCase()) || item.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }, [query]);
    useEffect(() => {
        (async () => {
        await dispatch(getAllUserData());
        })();
    }, []);
    useEffect(()=>{
        setAllUserDataState(allUserData);
    },[allUserData])
  return (
    <div>
      <div className='w-full flex border bg-gray-300 p-5'>
        <div className='w-3/5 text-3xl font-bold pr-10'><span className='float-right'>Users List</span></div>
        <div className='w-2/5'><button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right' onClick={()=>navigate('/Admin/Home')}>Back</button></div>
      </div>
      <br /><br />
      <div className='flex w-full bg-slate-200 p-3'>
        <div className='w-1/2'>
            <input type="text" className='w-3/4 border border-blue-800 border-2 rounded h-8 pl-2 ml-5' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
        </div>
        <div className='w-1/2'>
            <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4'>Add User</button>
        </div>
      </div>
      <br /><br />
      {
        filteredItems.length==0?query===''?(
          <div>
            <table className='table-auto w-full border-collapse border border-gray-300'>
              <thead>
                <tr className="bg-slate-200">
                    <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">User Name.</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">User ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
              {
                  allUserDataState?.map((item,index)=>{
                    const designation=[];
                    item.roles.map((role)=>{
                        designation.push(role.designation)
                    })
                    return(
                      <tr className="hover:bg-gray-100" key={item._id} >
                        <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item.fullName}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item._id}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{designation.toString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={()=>navigate('/Admin/User/UserList/View_More',{state:{...item}})}>View</button></td>
                        <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800'><BsTrash /></button></td>
                      </tr>
                    )
                    })
                }
                  
              </tbody>
            </table>
          </div>
          ):(
          <div className='text-2xl font-bold w-full text-center'>No Results Found!!!</div>
        ):(
          <div>
            <table className='table-auto w-full border-collapse border border-gray-300'>
              <thead>
                <tr className="bg-slate-200">
                    <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">User Name.</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">User ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Roles</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Expand</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
              {
                  filteredItems?.map((item,index)=>{
                    const designation=[];
                    item.roles.map((role)=>{
                        designation.push(role.designation)
                    })
                    return(
                      <tr className="hover:bg-gray-100" key={item._id} >
                        <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item.fullName}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{item._id}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{designation.toString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-indigo-700 text-white px-4 py-1 rounded-md hover:bg-indigo-800' onClick={()=>navigate('/Admin/User/UserList/View_More',{state:{...item}})}>View</button></td>
                        <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800'><BsTrash /></button></td>
                      </tr>
                    )
                    })
                }
                  
              </tbody>
            </table>
          </div>
        )
      }
      
    </div>
  )
}

export default UserList