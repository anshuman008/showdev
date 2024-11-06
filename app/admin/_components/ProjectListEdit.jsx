"use client";
import { Camera, LayoutGrid, Link2, SquareStack, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { UpdateProject,DeleteProject } from "../../serverActions/ProjectActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { uploadImage } from "../../../utils/supabaseLogic";
import Swal from "sweetalert2";

const ProjectListEdit = ({ ProjectList, refreshData }) => {
  const [selectedOption, setSlectedOption] = useState("");

  const handelFileUpload = async (event,field, id) => {
    const file = event.target.files[0];

    // console.log({"field of update":field,"file":file})
    if (file) {
      const url = await uploadImage(file);

      if (url) {
        await updateData(url, field, id);
      }
    }
  };


  const OnProjectDelete = async(projectId) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
       const res = await DeleteProject(projectId);


       if(res.status === 200){
        toast.error("deleted!",{
          position:'top-right'
         })

         refreshData();
       }
       else{
        toast.error("Something went wrong!!")
       }
       
      }
    });
  }

  const updateData = async (data, field, projectId) => {
    const res = await UpdateProject(data, field, projectId);
    if (res.status === 200) {
      if(field === 'logo'){
        refreshData();
      }
      toast.success(`${field} updated succesfully!!`);

    } else {
      console.log(res.error);
      toast.error("there is an error!");
    }
  };

  let timeoutId;

  const handeleUpdate = (value, field, userId) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      updateData(value, field, userId);
    }, 1000);
  };

  return (
    <div className="mt-10">
      {ProjectList?.map((project, index) => (
        <div key={index} className="my-7 bg-gray-800 p-5 rounded-lg">
          <div className="flex items-center gap-3">
            <label htmlFor="logo-upload">
              {!project.logo && (
                <Camera className="p-3 h-12 w-12 rounded-full bg-gray-500 cursor-pointer" />
              )}
              {project.logo && (
                <img
                  src={project.logo}
                  className=" h-12 w-12 rounded-full bg-gray-500 cursor-pointer"
                />
              )}

              <input
                type="file"
                id="logo-upload"
                style={{ display: "none" }}
                accept="image/png, image/gif, image/jpeg"
                onChange={(event) => handelFileUpload(event,"logo",project.id)}
              />
            </label>

            <input
              type="text"
              onChange={(event) => handeleUpdate(event.target.value, "name", project.id)}
              defaultValue={project.name}
              placeholder="Projects / startup"
              className="input input-bordered w-full my-2 "
            />
          </div>

          <input
            type="text"
            onChange={(event) => handeleUpdate(event.target.value, "desc", project.id)}
            defaultValue={project.desc}
            placeholder="Tell me about your project"
            className="input input-bordered w-full text-sm "
          />

          <div className="flex justify-between items-center">

            <div className="flex gap-3 mt-6">
            <Link2
              className={`h-12 w-12 p-3  rounded-md hover:bg-gray-600 ${
                selectedOption === "link" + index && "bg-gray-600"
              }`}
              onClick={() => setSlectedOption("link" + index)}
            />
            <LayoutGrid
              className={`h-12 w-12 p-3 rounded-md hover:bg-gray-600 ${
                selectedOption === "category" + index && "bg-gray-600"
              }`}
              onClick={() => setSlectedOption("category" + index)}
            />
             </div>
          

          <div className="flex justify-center items-center gap-3">
          <button className="btn btn-error btn-sm"><Trash2 onClick={() => OnProjectDelete(project.id)}/></button>
          <input type="checkbox" className="toggle toggle-primary"  
          defaultChecked={project.active}
          onChange={(event) => handeleUpdate(event.target.checked, "active", project.id)}
          />
          </div>
          </div>

          {selectedOption === "link" + index ? (
            <div className="mt-2">
              <label className="input input-bordered flex items-center gap-2">
                <Link2 className="" />
                <input
                  type="text"
                  className="grow"
                  placeholder="project link"
                  defaultValue={project.url}
                  onChange={(event) => handeleUpdate(event.target.value, "url", project.id)}
                  key={1}
                />
              </label>
            </div>
          ) : selectedOption === "category" + index ? (
            <div className="mt-2">
              <label className="input input-bordered flex items-center gap-2">
                <SquareStack className="" />
                <input
                  type="text"
                  className="grow"
                  placeholder="project category"
                  onChange={(event) =>
                    handeleUpdate(event.target.value, "category", project.id)
                  }
                  key={2}
                  defaultValue={project.category}
                />
              </label>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ProjectListEdit;
