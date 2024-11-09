import React from 'react'
import Provider from './Provider'

const laoyout = ({children}) => {
  return (
    <div>
        <Provider>
            {children}
        </Provider>
    </div>
  )
}

export default laoyout