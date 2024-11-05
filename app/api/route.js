import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../db/index";


export async function POST(req,res){
    
    try{
        const data = await prisma.userInfo.create({
            data:{
               name: "test user",
               email:"testhgfjghjfh@gmail.com",
               username:"hjjkhfkj"
            }
          })
      
          console.log(data);
      
          return NextResponse.json({"res":"Data is done!!"},{status:200});
    }
    catch(e){
        console.log('there is an error')
        return NextResponse.json({"error":e},{status:401});
    }
 }