import React from 'react'

const PojectList = ({projectList}) => {


  console.log("here is the projects: ",projectList)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>

       {
        projectList?.map((project,index) => (
          <div key={project.id} className='border shadow-sm rounded-lg p-5'>
            <div className='flex gap-2 items-center'>
            <img src={project?.logo} className='w-[40px] h-[40px] rounded-full'/>
            <h2>{project?.name}</h2>
            </div>
            
            </div> 
        ))
       }
    </div>
  )
}

export default PojectList