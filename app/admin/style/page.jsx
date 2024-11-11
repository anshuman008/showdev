import React from 'react'
import MobilePreview from '../_components/MobilePreview'
import ThemeOptions from "./_components/ThemeOptions"
const Srtyle = () => {
  return (
    <div className=' grid grid-cols-1 lg:grid-cols-3 w-full p-5'>

    <div className='col-span-2'>
      <ThemeOptions/>
     </div>

     <div className='col-span-1'> 
     <MobilePreview/>
     </div>
  </div>
  )
}

export default Srtyle