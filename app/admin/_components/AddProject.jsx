import { Link2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import useUserInfo from "../../../store/userInfo";
import { CreateNewProject ,GetUserProjects } from "../../serverActions/ProjectActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import ProjectListEdit from "./ProjectListEdit"

const AddProject = () => {
  const [openUrl, setOpenUrl] = useState(false);
  const [loading,setLoading] = useState(false);

  const userdata = useUserInfo();


  const handelSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    // userdata.userInfo.id

    const res = await CreateNewProject(userdata?.userInfo?.id,event.target[0].value);
       

    if(res.status === 200){
      toast.success("New project added!!");
    }else{
      console.log(res.data);
      toast.error("Something went wrong!!")
    }

    setOpenUrl(false);
    setLoading(false);
  };
  return (
    <div>
      {!openUrl ? (
        <button
          onClick={() => setOpenUrl(true)}
          className="btn btn-secondary w-full"
        >
          + Add New Project/Startup
        </button>
      ) : (
        <form onSubmit={handelSubmit} className="p-3 rounded-lg bg-gray-800">
          <label className="input input-bordered flex items-center gap-2 my-3">
            <Link2 />
            <input type="url" className="grow" placeholder="Project Url" defaultValue={'https://'}/>
          </label>

          <button
            type="submit"
            className="btn btn-secondary w-full"
            disabled={loading}
          >
            
            + Add New Project/Startup
          </button>
        </form>
      )}
      
    </div>
  );
};

export default AddProject;
