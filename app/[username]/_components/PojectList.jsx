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
          <div onClick={() => increamentClick(project.id,project.url)}  key={project.id} className='relative border shadow-sm rounded-lg p-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
            <div className='flex gap-2 items-center'>
            <img src={project?.logo?project.logo:'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png'} className='w-[40px] h-[40px] rounded-full'/>
                    <div className='w-full flex justify-between items-center'>
                      
              <span className='font-bold '>{project?.name}</span>

              
              {project?.category && <div className="badge badge-accent text-xs font-normal absolute top-[-5px] right-0">{project?.category}</div>
            }
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