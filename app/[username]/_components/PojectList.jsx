import Link from 'next/link'
import React from 'react'
import { ProjectClickUpate } from '../../serverActions/ProjectActions'
import moment from 'moment'

const PojectList = ({projectList}) => {


  console.log("here is the projects: ",projectList)


  const increamentClick = async(projectId,projectUrl) => {
      await ProjectClickUpate(moment().format('MMM'),projectId);
        
       window.open(projectUrl, '_blank');
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>

       {
        projectList?.map((project,index) => (
          <div onClick={() => increamentClick(project.id,project.url)}  key={project.id} className='border shadow-sm rounded-lg p-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
            <div className='flex gap-2 items-center'>
            <img src={project?.logo} className='w-[40px] h-[40px] rounded-full'/>
            <div className='w-full flex justify-between items-center'>
              <span className='font-bold '>{project?.name}</span>
              <div className="hidden md:block badge badge-accent text-xs font-normal">{project?.category}</div>
            </div>

            </div>
             
             <h2 className='text-base-content/80 text-xs lg:text-sm my-2'>{project?.desc}</h2>

            </div> 
        ))
       }
    </div>
  )
}

export default PojectList