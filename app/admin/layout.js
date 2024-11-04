import React from 'react'
import SideNav from './_components/SideNav'

const AdminLayout = ({children}) => {
  return (
    <div>
        <div className='fixed w-24'>
        <SideNav/>
        </div>

        <div className='ml-24'>
        {children}
        </div>
    </div>
  )
}

export default AdminLayout