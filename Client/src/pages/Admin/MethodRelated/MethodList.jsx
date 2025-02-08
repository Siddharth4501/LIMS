import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import toast from 'react-hot-toast';
import { deleteSubstance, getSubstanceData } from '../../../Redux/Slices/SubstanceSlice';
import AdminCommomNav from '../../../components/AdminCommomNav';
import AdminCommonPanel from '../../../components/AdminCommonPanel';

const MethodList = () => {
  const { substanceData } = useSelector((state) => state.substance);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allSubstanceDataState, setAllSubstanceDataState] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const filtered = allSubstanceDataState?.filter(item =>
      item.Test.Test_Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query,allSubstanceDataState]);
  useEffect(() => {
    (async () => {
      await dispatch(getSubstanceData());
    })();
  }, []);
  useEffect(() => {
    setAllSubstanceDataState(substanceData);
  }, [substanceData])

  const handleDelete = async (methodID,Method,Unit,Limit) => {
    try {
      console.log(methodID, "judju")
      const data = {
        "methodID": methodID,
        "Method":Method,
        "Unit":Unit,
        "Limit":Limit
      }
      const response = await dispatch(deleteSubstance(data));
      if (response?.payload?.success) {
        toast.success('Method Deleted Successfully');
        navigate('/Admin/Substance/MethodList')
      }
    } catch (error) {
      toast.error(error)
    }
  }
  let indexsCounter = 1;
  return (
    <>
      <AdminCommomNav />
      <div className='flex'>
        <AdminCommonPanel />
        <div className='w-full'>
          
          <br /><br />
          <div className='flex w-full bg-gray-100 border-2 border-blue-600 p-3'>
            <div className='w-1/2'>
              <input type="text" className='w-3/4 border-blue-600 border-2 rounded-md h-8 p-4 ml-5' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search For A Particular User...' />
            </div>
            <div className='w-1/2'>
              <button className='bg-indigo-700 px-4 py-1 text-white rounded-md float-right mr-4' onClick={() => navigate('/Admin/Substance/AddMethod')}>Add Method</button>
            </div>
          </div>
          {
            allSubstanceDataState.length>0?
            (
              <div>

                  <br /><br />
                  {
                    filteredItems.length == 0 ? query === '' ? (
                      <div>
                        <table className='table-auto w-full border-collapse border border-gray-300'>
                          <thead>
                            <tr className="bg-slate-200">
                              <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Test</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Test ID</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Method</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Unit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Limit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              allSubstanceDataState?.map((item, index) => {
                                return item.MethodUnitList.map((data) => {
                                  const currentIndex = indexsCounter++;
                                  return (
        
                                    <tr className="hover:bg-gray-100" key={`${item._id}-${data.Method}-${currentIndex}`} >
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Test.Test_Name}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Test.TestID}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Method}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Unit}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Limit ? data.Limit:''}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id,data.Method,data.Unit,data.Limit)}><BsTrash /></button></td>
                                    </tr>
                                  )
                                })
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
                              <th className="border border-gray-300 px-4 py-2 text-center">Test</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Test ID</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Method</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Unit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Limit</th>
                              <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              filteredItems?.map((item, index) => {
                                return item.MethodUnitList.map((data) => {
                                  const currentIndex = indexsCounter++;
                                  return (
                                    <tr className="hover:bg-gray-100" key={`Search-Related-${item._id}-${data.Method}-${currentIndex}`} >
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{currentIndex}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Test.Test_Name}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{item.Test.TestID}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Method}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Unit}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto">{data.Limit ? data.Limit:''}</td>
                                      <td className="border border-gray-300 px-4 py-2 text-center max-w-72  overflow-x-auto"><button type="button" className='bg-red-700 text-white px-4 py-1 rounded-md hover:bg-red-800' onClick={() => handleDelete(item._id,data.Method,data.Unit,data.Limit)}><BsTrash /></button></td>
                                    </tr>
                                  )
                                })
                              })
                            }
        
                          </tbody>
                        </table>
                      </div>
                    )
                  }
              </div>
            )
            :
            (
              <div className='h-[68vh] w-[96vw] flex justify-center items-center '><div className='text-2xl font-semibold'>No Method Added Yet!!!</div></div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default MethodList