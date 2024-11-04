"use client"
import { UserButton } from '@clerk/nextjs'
import { ChartBar } from 'lucide-react'
import { Settings } from 'lucide-react'
import { Brush } from 'lucide-react'
import { Layers3 } from 'lucide-react'



const SideNav = () => {

   const menuList = [
    {
       id:1,
       name:"Pages",
       icon: <Layers3 size={24}/>
     },
     {
        id:2,
        name:"Stats",
        icon: <ChartBar  size={24}/>
      },
      {
        id:3,
        name:"Styles",
        icon: <Brush  size={24}/>
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
        <div key={index} className='p-2 py-4 rounded-lg bg-primary flex justify-center items-center mb-5 tooltip-secondary tooltip  tooltip-right' data-tip={menu.name}>
             {menu.icon}
        </div>   
     ))}


    <div className='fixed bottom-3 flex ml-3'> <UserButton/></div>
    </div>
  )
}

export default SideNav