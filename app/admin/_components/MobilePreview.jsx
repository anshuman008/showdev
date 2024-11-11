"use client"
import React from 'react'
import useUserState from '../../../store/userProfileUpdate'

const MobilePreview = () => {
  
  const {userState} = useUserState()


  return (
    <div className='p-5  md:fixed'>
      {userState}
    <div className='border-[13px]  lg:w-[330px] xl:w-[350px] w-full border-black 
    max-h-[650px]
    h-screen rounded-[40px] m-2 shadow-md shadow-primary'>
      <iframe
        title='Profile'
        key={userState}
        src={'http://localhost:3000/toxic005'}
        width="100%"
        height="100%"
        className='rounded-[25px]'
      />
    </div>
</div>
  )
}

export default MobilePreview