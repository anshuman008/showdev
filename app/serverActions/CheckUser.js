"use server"

import prisma from "../../lib/prisma";

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