"use server"
import prisma from "../db/index";

export const CheckUser = async(email) =>{

    console.log("here is the email!", email)
    const result = await prisma.userInfo.findUnique({
        where: {email}          
       })

       return result;
  }


  export const CreateUserIndDb = async(user) => {
    try{
        const data = await prisma.userInfo.create({
            data:{
               name: user.name,
               email: user.email,
               username: user.username
            }
          })
    
          return {data: data, staus: 200};
    }
    catch(e){
        return {data: "", staus: 400};
    } 
   
  }



export const UpdateUser =  async(data,field,email) => {
  try{
    const res = await prisma.userInfo.update({
      where:{
        email:email,
      },
      data: {
        [field]: data, 
      },
     })


     return {res:res,status:200}
  }
  catch(e){
    return {"error":e,status:401}
  }


}


export const GetUserDetails = async(email) => {
  try{
       const res = await prisma.userInfo.findUnique({
        where:{
          email:email
        }
       }); 
       
       return {userInfo:res,status:200}
  }
  catch(e){
    return {"error":e,status:400}
  }
}

export const GetUserDetailsWithProjects = async(username) => {
  try{
       const res = await prisma.userInfo.findUnique({
        where:{
          username:username
        },
        include: { projects: true },
       }); 
       

       if(!res){
        return {"error":"no user found",status:400}
       }
       
       return {userInfo:res,status:200}
  }
  catch(e){
    return {"error":e,status:400}
  }
}
