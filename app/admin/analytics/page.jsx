"use client"
import AnalyticCharts from "./_components/AnalyticCharts"
import UniqueVisitors from "./_components/UniqueVisitors"
import ProjectVisitors from "./_components/ProjectVisitors"

const AnalyticPage = () => {
  return (
    <div>
        <div className="h-screen p-10">
           <h2 className="font-bold text-2xl mt-10">Analytics</h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
            
            <div>
               <UniqueVisitors/>
            </div>
            <div>
            <ProjectVisitors/>
            </div>
            <div>
              Total Subscriber
            </div>
            <div>
              Coming Soon.....
            </div>
           </div>
        </div>
   
    </div>
  )
}

export default AnalyticPage