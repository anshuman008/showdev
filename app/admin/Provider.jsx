"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import useUserInfo from "../../store/userInfo"
import { GetUserDetails } from '../serverActions/CheckUser'
const Provider = ({children}) => {

 const {user} = useUser();
 
 const {setUser} = useUserInfo();

 const getUser = async() =>{
      
    const res = await GetUserDetails(user.primaryEmailAddress.emailAddress);
    
    if(res.status === 200){
        setUser(res.userInfo)
    }

    console.log("here is teh uder info: ",res.userInfo);
 }


 useEffect(() => {
    user&&getUser()
 },[user])


  return (
    <div>{children}</div>
  )
}

export default Provider