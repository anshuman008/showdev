"use client"
import React, { use, useState } from 'react'
import thems from "../../../_data/Themes"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { UpdateUser } from '../../../serverActions/CheckUser';
import { useUser } from '@clerk/nextjs';
import useUserInfo from '../../../../store/userInfo';



const ThemeOptions = () => {

  const {user} = useUser();
  const [selectedTheme,setSlectedTheme] = useState('');
  const {userInfo} = useUserInfo();

  const onThemeSlect = async(theme) =>{
     setSlectedTheme(theme);
    user&&updateData(theme,'theme',user?.primaryEmailAddress?.emailAddress)
  }



  const updateData = async (data, field, userEmail) => {
    const res = await UpdateUser(data, field, userEmail);
    if (res.status === 200) {
      toast.success(`saved!!`);
    } else {
      console.log(res.error);
      toast.error("there is an error!");
    }
  };


  return (
    <div className='font-bold text-3xl py-10'>Select Your Page Theme

    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
     {
        thems.map((theme,index) => (
              <div key={index} className={`flex p-3 bg-gray-700 rounded-lg hover:scale-105 transition-all cursor-pointer ${(userInfo.theme === theme.theme || selectedTheme === theme.theme) && 'border-[2px] rounded-lg'}`}
               onClick={() => onThemeSlect(theme?.theme)}
              >
                <div className='w-full h-[40px] rounded-l-lg' style={{backgroundColor:theme.primary}}></div> 
                <div className='w-full h-[40px]' style={{backgroundColor:theme.secondary}}></div>   
                <div className='w-full h-[40px]' style={{backgroundColor:theme['base-100']}}></div>   
                <div className='w-full h-[40px] rounded-r-lg' style={{backgroundColor:theme.accent}}></div>     
              </div>  
        ))
     }
    </div>
    </div>
  )
}

export default ThemeOptions