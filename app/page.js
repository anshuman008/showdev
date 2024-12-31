"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {

   const {user} = useUser();
   const router = useRouter();


   useEffect(() => {
    if(user?.primaryEmailAddress?.emailAddress){
      router.push("/admin")
    };

   },[user]);


  return (
    <div>
       <h1>Hello there!!</h1>

       <UserButton/>
    </div>
  )
}

export default Page;