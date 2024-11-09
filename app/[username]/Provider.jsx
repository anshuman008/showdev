"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { GetUserDetailsWithProjects } from '../serverActions/CheckUser';
import useUserInfo from '../../store/userInfo';

const Provider = ({children}) => {
   
   
    const {setUser} = useUserInfo();
    const {user} = useUser();
    console.log("Rendered!!")

     useEffect(() => {
        user&&getUserDetails();
     },[user])  

    const getUserDetails = async() =>{
           const res = await GetUserDetailsWithProjects(user.primaryEmailAddress.emailAddress);
           if(res.status === 200){
            console.log("this is teh user info",res.userInfo);
            setUser(res.userInfo)
           }
    }
  return (
    <div data-theme="light" >{children}</div>
  )
}

export default Provider