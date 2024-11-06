import React from 'react'
import SideNav from './_components/SideNav'
import Provider from "./Provider"


const AdminLayout = ({children}) => {
  return (
    <div>
        <div className='fixed w-24'>
        <SideNav/>
        </div>

        <div className='ml-24'>
          <Provider>
          {children}
          </Provider>
        </div>
    </div>
  )
}

export default AdminLayout