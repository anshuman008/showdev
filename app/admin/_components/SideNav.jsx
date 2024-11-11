"use client"
import { UserButton } from '@clerk/nextjs'
import { ChartBar } from 'lucide-react'
import { Settings } from 'lucide-react'
import { Brush } from 'lucide-react'
import { Layers3 } from 'lucide-react'
import Link from 'next/link'



const SideNav = () => {

   const menuList = [
    {
       id:1,
       name:"Pages",
       icon: <Layers3 size={24}/>,
       path: '/admin'
     },
     {
        id:2,
        name:"Stats",
        icon: <ChartBar  size={24}/>,
        path: '/admin/analytics'
      },
      {
        id:3,
        name:"Styles",
        icon: <Brush  size={24}/>,
        path: '/admin/style'
      },
      {
        id:4,
        name:"Settings",
        icon: <Settings  size={24}/>
      }
]

  return (
    <div className='bg-neutral-800 h-screen p-4  relative'>
     {menuList.map((menu,index) => (
        <Link href={menu?.path || "/"} key={index} className='p-2 py-4 rounded-lg bg-primary flex justify-center items-center mb-5 tooltip-secondary tooltip  tooltip-right' data-tip={menu.name}>
             {menu.icon}
        </Link>   
     ))}


    <div className='fixed bottom-3 flex ml-3'> <UserButton/></div>
    </div>
  )
}

export default SideNav