"use client";
import {  MapPin, Share, ShareIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react';

const UserDetailsInfo = ({userInfo}) => {

  const [buttonText, setButtonText] = useState('Share');


  const handleShareClick = () => {
    const url = window.location.href; // Get the current URL
    navigator.clipboard.writeText(url) // Copy to clipboard
      .then(() => {
        setButtonText('Copied'); // Update button text
        setTimeout(() => setButtonText('Share'), 2000); // Reset after 2 seconds
      })
      .catch(() => alert('Failed to copy the URL')); // Handle errors
  };
  return (
    <div className='flex md:justify-center flex-col md:h-screen '>

     <div className='w-full  flex md:flex-col items-center md:items-start gap-3'>

      <div>
        <img src={userInfo.profileImage} className='w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full'/>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-bold text-lg md:text-2xl'>{userInfo.name}</h2>
        <span className='text-gray-500 text-lg md:text-xl flex justify-start items-center gap-2 w-full'> <MapPin className='size-4'/>  {userInfo.location}</span>
        <div className="mt-3">
            <button
              className="md:hidden btn btn-primary btn-sm text-xs"
              onClick={handleShareClick}
            >
              <ShareIcon className="h-3 w-3" /> {buttonText}
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