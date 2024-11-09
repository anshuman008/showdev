import {  MapPin } from 'lucide-react'
import React from 'react'

const UserDetailsInfo = ({userInfo}) => {
  return (
    <div className='flex justify-center flex-col md:h-screen '>

     <div className='w-full  flex md:flex-col items-center md:items-start justify-center gap-3'>

      <div>
        <img src={userInfo.profileImage} className='w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full'/>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-bold text-lg md:text-2xl'>{userInfo.name}</h2>
        <span className='text-gray-500 text-lg md:text-2xl flex justify-center items-center gap-3'> <MapPin className='size-5'/>  {userInfo.location}</span>
      </div>
     </div>

     
   <div className='my-7'>
    {userInfo.bio}
   </div>
    </div>
  )
}

export default UserDetailsInfo