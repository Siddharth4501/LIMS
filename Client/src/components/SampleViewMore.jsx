import React from 'react'
import { useLocation } from 'react-router-dom'

const SampleViewMore = () => {
    const {state}=useLocation();
  return (
    <div>
      {/* {state.Name} */}
      <div>Due Date: {state.Date.split('T')[0]}</div>
    </div>
  )
}

export default SampleViewMore
