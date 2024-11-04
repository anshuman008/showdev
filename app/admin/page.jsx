"use client"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'
import prisma  from '../../lib/prisma';
import { CheckUser } from '../serverActions/CheckUser';


const page = () => {
   const {user} = useUser();
   const email = user?.primaryEmailAddress?.emailAddress
   const router = useRouter();
   
   useEffect(() => {
        user&&checkUser();
   },[user])

  const checkUser = async() =>{
     try{
        const res = await CheckUser(email);
        
        if(!res){
          router.replace("/")
        }

     }catch(e){
      console.log("there is an error",e);
     }
  }

  return (
    <div>Admin</div>
  )
}

export default page