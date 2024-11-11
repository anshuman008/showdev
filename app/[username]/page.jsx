"use client"
import React from 'react'
import useUserInfo from '../../store/userInfo';
import UserDetailsInfo from "./_components/UserDetailsInfo";
import ProjectList  from "./_components/PojectList";


const Page = () => {

  const {userInfo,error,loading} = useUserInfo();


    console.log("here is the error details:",error);

    
    if(loading){
      return (<div className='min-h-screen flex justify-center items-center'>
        <h2>Loading....</h2>
       </div>)
    }

    if(error){
      return (<div className='min-h-screen flex justify-center items-center'>
        <h2>User not found!!</h2>
       </div>)
    }
  
  return (
    <div className='p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5 min-h-screen'>
      <div>
         <UserDetailsInfo userInfo={userInfo}/>
      </div> 

      <div>
         <ProjectList projectList={userInfo.projects}/>
      </div> 
    </div>
  )
}

export default Page