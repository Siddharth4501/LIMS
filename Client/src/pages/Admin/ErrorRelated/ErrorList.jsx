import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import toast from 'react-hot-toast';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';
import { deleteError, getError } from '../../../Redux/Slices/ExtraSlice';

const ErrorList = () => {
  const { errorData } = useSelector((state) => state.administration);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorDataState, setErrorDataState] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const filtered = errorDataState?.filter(item =>
      item.Type_Of_Testing.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);
  useEffect(() => {
    (async () => {
      await dispatch(getError());
    })();
  }, []);
  useEffect(() => {
    setErrorDataState(errorData);
  }, [errorData])

  const handleDelete=async(errorID)=>{
    try {
      console.log(errorID,"judju")
      const data={
        "errorID":errorID
      }
      const response = await dispatch(deleteError(data));
      if (response?.payload?.success) {
        toast.success('Error Deleted Successfully');
        navigate('/Admin/Error/ErrorList')
      }
    } catch (error) {
        toast.error(error)
    }
  }
  return (
    <>
    <AdminCommomNav/>
      <div className='flex'>
        <AdminCommonPanel />

            <div className='w-full'>
              
              <br /><br />
              <div className='flex w-full bg-gray-100 border-blue-600 border-2 p-3'>
                <div className='w-1/2'>
                    <input type="text" className='w-3/4 border-blue-600 border-2 rounded-md h-8 p-4 ml-5 outline-0' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
                </div>
                <div className='w-1/2'>
                  <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4' onClick={()=>navigate('/Admin/Error/AddError')}>Add Error</button>
                </div>
              </div>
          {
            errorDataState?.length > 0 ? (
              <div className='w-full'>

                <br /><br />
                {
                  filteredItems.length == 0 ? query === '' ? (
                    <div>
                      <table className='table-auto w-full border-collapse border border-gray-300'>
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Error Message</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Type Of Testing</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            errorDataState?.map((item, index) => {
                              return (
                                <tr className="hover:bg-gray-100" key={`${item._id}-${index}`} >
                                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{item.Error_Message}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{item.Group_Name}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{item.Type_Of_Testing}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id)}><BsTrash /></button></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className='text-2xl font-bold w-full text-center'>No Results Found!!!</div>
                  ) : (
                    <div>
                      <table className='table-auto w-full border-collapse border border-gray-300'>
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Error Message</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Group</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Type Of Testing</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            filteredItems?.map((item, index) => {
                              return (
                                <tr className="hover:bg-gray-100" key={`searchRelated-${item._id}-${index}`} >
                                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{item.Error_Message}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{item.Group_Name}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center">{item.Type_Of_Testing}</td>
                                  <td className="border border-gray-300 px-4 py-2 text-center"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id)}><BsTrash /></button></td>
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
              : (
                <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No Error Added Yet!!!</div></div>
              )
          }
            </div>
        </div>
        </>
  )
}

export default ErrorList