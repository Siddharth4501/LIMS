import React from 'react'
import { useLocation } from 'react-router-dom'

const SampleViewMore = () => {
    const {state}=useLocation();
  return (
    <div>
      {/* {state.Name} */}
      <div className='mt-3 mb-2 ml-2 border border-md border-gray-300 bg-slate-300 p-2 w-1/2 rounded-md'><b>Due Date:</b> {state.Date.split('T')[0]}</div>
      <div className='container w-full'>
        <div className='container grid border m-2 border-gray-300 border-md'>
          <div className='m-4'>
            <input type="checkbox" name="" id="" className='mr-2 ml-2' />
            <select name="Type Of Testing" id="Type Of Testing" className='w-1/2 bg-slate-300 border rounded-md pl-3 pr-3 pt-1 pb-1'>
              <option value="Type Of Testing">Type Of Testing</option>
              {
                state.Type_Of_Testing.map((item)=>{
                  console.log(item,"goat");
                  return <option value={item} className='hover:bg-slate-100'>{item}</option>
                })
              }
            </select>
          </div>
          <div className='p-2'>
            {
              state.Tests.map((item,index)=>{
                return <div className='w-full grid grid-cols-6 m-2 p-2 '>
                  <div className='font-bold border border-black p-2'>
                    {index+1}
                  </div>
                  <div className='border border-black p-2'>
                    <input type="checkbox" name="" id=""/>
                    {item.Test}
                  </div>
                  <div className='border border-black p-2'>
                    <select name="" id="" className='bg-slate-300 pl-3 pr-3 pt-1 pb-1 rounded-md'>
                      <option value="Method">Analyst</option>
                      <option value="Method">Analyst1</option>
                      <option value="Method">Analyst2</option>
                      <option value="Method">ANalyst3</option>
                      <option value="Method">Analyst4</option>
                    </select>
                  </div>
                  <div className='border border-black p-2'>
                    <select name="" id="" className='bg-slate-300 pl-3 pr-3 pt-1 pb-1 rounded-md'>
                      <option value="Method">Method</option>
                      <option value="Method">Method1</option>
                      <option value="Method">Method2</option>
                      <option value="Method">Method3</option>
                      <option value="Method">Method4</option>
                    </select>
                  </div>
                  <div className='border border-black p-2'>
                  <select name="" id="" className='bg-slate-300  pl-3 pr-3 pt-1 pb-1 rounded-md'>
                      <option value="Unit">Unit</option>
                      <option value="Unit">Unit1</option>
                      <option value="Unit">Unit2</option>
                      <option value="Unit">Unit3</option>
                      <option value="Unit">Unit4</option>
                    </select>
                  </div>
                  <div className='border border-black p-2'>Result:0</div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SampleViewMore
