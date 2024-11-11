"use client"
import React from 'react'
import useUserInfo from '../../store/userInfo';
import UserDetailsInfo from "./_components/UserDetailsInfo";
import ProjectList  from "./_components/PojectList";


const Page = () => {

  const {userInfo} = useUserInfo();
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