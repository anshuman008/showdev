"use client"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'
import { CheckUser } from '../serverActions/CheckUser';
import MobilePreview from "./_components/MobilePreview"
import FormContent from "./_components/FormContent"
const Page = () => {

  console.log("page is re rendered!!!")


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
    <div className=' grid grid-cols-1 lg:grid-cols-3 w-full p-5'>

      <div className='col-span-2'>
        <FormContent/>
       </div>

       <div className='col-span-1'> 
       <MobilePreview/>
       </div>
    </div>
  )
}

export default Page