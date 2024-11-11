import React, { useEffect, useState } from 'react'
import BasicDetails from './BasicDetails'
import AddProject from './AddProject'
import { GetUserProjects } from '../../serverActions/ProjectActions'
import ProjectListEdit from './ProjectListEdit'
import useUserInfo from '../../../store/userInfo'
import useUserState from '../../../store/userProfileUpdate'

const FormContent = () => {

  const [projectList,setProjectList] = useState([]); 
  // const {refreshData} = useUserState();  

  const userdata = useUserInfo();

  const getProjects = async() =>{
    const res = await GetUserProjects(userdata?.userInfo?.id);

    if(res.status === 200){
        setProjectList(res.data);
        console.log("Data retreive!!")
    }
  }


  useEffect(() => {
      userdata&&getProjects();
  },[userdata]) // we can also pass refreshData as a globar data that whenver change refetch the list


  return (
    <div className='py-10 overflow-auto'>
      <h2 className='text-3xl font-bold'>Start Designing your portfolio</h2>
       <BasicDetails/>

       <br className='py-3'></br>
       <AddProject refreshData={getProjects}/>

       {projectList && <ProjectListEdit ProjectList={projectList} refreshData={getProjects}/>}
    </div>
  )
}

export default FormContent