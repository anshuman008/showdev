import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const Provider = ({children}) => {
  return (
<ClerkProvider>
{children}
</ClerkProvider>
  )
}

export default Provider