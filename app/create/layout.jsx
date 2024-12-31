import React from 'react'
import Provider from './Provider'


const AdminLayout = ({children}) => {
  return (
    <div>
          <Provider>
          {children}
          </Provider>
    </div>
  )
}

export default AdminLayout