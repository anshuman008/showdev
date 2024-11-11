import {  MapPin, Share, ShareIcon } from 'lucide-react'
import React from 'react'

const UserDetailsInfo = ({userInfo}) => {
  return (
    <div className='flex md:justify-center flex-col md:h-screen '>

     <div className='w-full  flex md:flex-col items-center md:items-start gap-3'>

      <div>
        <img src={userInfo.profileImage} className='w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full'/>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-bold text-lg md:text-2xl'>{userInfo.name}</h2>
        <span className='text-gray-500 text-lg md:text-2xl flex justify-start items-center gap-2 w-full'> <MapPin className='size-5'/>  {userInfo.location}</span>
        <div className='mt-3'>
          <button className='md:hidden btn btn-primary btn-sm text-xs'>
            <ShareIcon className='h-3 w-3' /> Share
          </button>
        </div>
      </div>
     </div>

     
   <h2 className='my-2'>
    {userInfo.bio}
   </h2>
    </div>
  )
}

export default UserDetailsInfo