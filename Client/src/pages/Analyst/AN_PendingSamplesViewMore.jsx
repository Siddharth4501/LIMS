import React from 'react'
import { useLocation } from 'react-router-dom'

const AN_PendingSamplesViewMore = () => {
    const {state}=useLocation();
    console.log(state);
  return (
      <div>
          <div className='flex border bg-slate-300 p-5 gap-20'>
              <div className=''>
                  <b>Start Date:</b>12/05/25
              </div>
              <div>
                  <b>End Date:</b>23/05/25
              </div>
          </div>
          <br /><br />
          {
              Object.keys(state.Substances_To_Be_Analysed).map((key) => {
                  { console.log(state.Substances_To_Be_Analysed[key], "klfk") }
                  return (
                      <div className='flex flex-col mb-10'>
                          <div className='bg-slate-100 flex gap-20 p-2'>
                              <div>
                                  <b>Type Of Testing:</b> {key}
                              </div>
                              <div className=''>
                                  <b>Start Date:</b>12/05/25
                              </div>
                              <div>
                                  <b>End Date:</b>23/05/25
                              </div>
                          </div>

                          <div>
                              <table className='"table-auto w-full border-collapse border border-gray-300'>
                                  <thead>
                                      <tr className="bg-slate-200">
                                          <th className="border border-gray-300 px-4 py-2 text-center">S.No.</th>
                                          <th className="border border-gray-300 px-4 py-2 text-center">Tests</th>
                                          <th className="border border-gray-300 px-4 py-2 text-center">Method</th>
                                          <th className="border border-gray-300 px-4 py-2 text-center">Unit</th>
                                          <th className="border border-gray-300 px-4 py-2 text-center">Result</th>
                                          <th className="border border-gray-300 px-4 py-2 text-center">Upload Excel</th>
                                      </tr>
                                  </thead>
                                  {
                                      state.Substances_To_Be_Analysed[key].map((item, index) => {
                                          return (
                                              <tbody>

                                                  <tr className="hover:bg-gray-100">
                                                      <td className="border border-gray-300 px-4 py-2 text-center font-bold">{index + 1}.</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">{item.Test}</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">{item.Method}</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">{item.Unit}</td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center"><input type="number" name="" id="" defaultValue={0} min={0} value={item.result} className='text-center bg-zinc-300 rounded-md w-20' /></td>
                                                      <td className="border border-gray-300 px-4 py-2 text-center">
                                                          <input type="file" name="Test Result Excel" id="Test Result Excel" />
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          )
                                      })}
                              </table>
                          </div>



                      </div>
                  )
              })}

        <br />
        <div className='w-full'>
            <button className='bg-indigo-700 text-white px-20 py-2 text-sm rounded-md mx-auto flex justify-center hover:bg-indigo-900 '>Upload Result</button>
        </div>
      </div>

  )
}

export default AN_PendingSamplesViewMore