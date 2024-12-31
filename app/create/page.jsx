"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckUser, CreateUserIndDb } from "../serverActions/CheckUser";
import { useRouter } from "next/navigation";

const Page = () => {

  const [username,setUsername] = useState('');
  const {user} =  useUser();
  const [iseLoading,setIsLoading] = useState(false);
  const router = useRouter();


  const createUser = async() =>{

    setIsLoading(true);
    const userData = {
      email:user.primaryEmailAddress.emailAddress,
      name:user?.fullName,
      username:username.trim()
    }

    
   const res =  await CreateUserIndDb(userData);


   if(res.staus === 200){
     toast.success("User created succesfully!!")
      router.push("/admin")
   }else{
        toast.error("This username is already exist!!")
   }
    

   setIsLoading(false);
  }

 
  
  useEffect(() => {
       user&&checkUser();
  },[user])

 const checkUser = async() =>{
       const res = await CheckUser(user?.primaryEmailAddress?.emailAddress);
       
       if(res){
         router.replace("/admin")
       }
 }
  


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-1/3 rounded-md shadow-md border-2 border-black h-72 gap-y-5">
        <h1 className="text-xl font-bold ">
          Create username for Portfolio
        </h1>

          <span className="">add username to your portfolio</span>
          <input
            maxLength={10}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {setUsername(e.target.value)}}
          />

            {
              iseLoading?<span className="loading loading-dots loading-md"></span>:   <button
              disabled={!username}
              onClick={() => {
                createUser();
                // toast.error("Error Notification !", {
                //   position: "top-left",
                // });
              }}
              className="btn btn-success"
            >
              Create
            </button>

            }
        </div>
      </div>
  );
};

export default Page;
