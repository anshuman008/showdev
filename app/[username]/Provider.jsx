"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { GetUserDetailsWithProjects } from '../serverActions/CheckUser';
import useUserInfo from '../../store/userInfo';
import { usePathname } from 'next/navigation';

const Provider = ({children}) => {
   
    const {setUser,userInfo,setError,setLoading} = useUserInfo();
    const path = usePathname().replace('/','');

     useEffect(() => {
        console.log(path);
        getUserDetails();
     },[])  

    const getUserDetails = async() =>{
           setLoading(true);

           const res = await GetUserDetailsWithProjects(path);


           if(res.status === 200){
            setUser(res.userInfo)
            setError(false);
           }

           else if(res.status === 400){
            setError(true);
           }

           setLoading(false)
    }
    
  return (
    <div data-theme={userInfo?.theme || "light"} >{children}</div>
  )
}

export default Provider