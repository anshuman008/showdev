"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { GetUserDetailsWithProjects } from '../serverActions/CheckUser';
import useUserInfo from '../../store/userInfo';
import { usePathname } from 'next/navigation';

const Provider = ({children}) => {
   
    const {setUser,userInfo} = useUserInfo();
    const path = usePathname().replace('/','');


    // console.log("Rendered!!")

     useEffect(() => {
        console.log(path);
        getUserDetails();
     },[])  

    const getUserDetails = async() =>{
           const res = await GetUserDetailsWithProjects(path);
           if(res.status === 200){
            console.log("this is teh user info",res.userInfo);
            setUser(res.userInfo)
           }
    }
    
  return (
    <div data-theme={userInfo.theme} >{children}</div>
  )
}

export default Provider