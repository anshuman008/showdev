"use client";
import {
  BookOpen,
  Camera,
  Grid,
  LayoutGrid,
  Link2,
  SquareStack,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  UpdateProject,
  DeleteProject,
} from "../../serverActions/ProjectActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { uploadImage } from "../../../utils/supabaseLogic";
import Swal from "sweetalert2";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useUserState from "../../../store/userProfileUpdate";

const ProjectListEdit = ({ ProjectList, refreshData }) => {
  const [selectedOption, setSlectedOption] = useState("");
  const [projectListData,setProjectListData] = useState([])
  const {setUserState} = useUserState();


  
  const handelFileUpload = async (event, field, id) => {
    const file = event.target.files[0];

    // console.log({"field of update":field,"file":file})

    if (file) {
      const url = await uploadImage(file);

      if (url) {
        await updateData(url, field, id);
      }
    }
  };

  const OnProjectDelete = async (projectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await DeleteProject(projectId);

        if (res.status === 200) {
          toast.error("deleted!", {
            position: "top-right",
          });
          setUserState();
          refreshData();
        } else {
          toast.error("Something went wrong!!");
        }
      }
    });
  };

  const updateData = async (data, field, projectId) => {
    const res = await UpdateProject(data, field, projectId);
    if (res.status === 200) {
      if (field === "logo") {
        refreshData();
      }
      
      setUserState();
      toast.success(`${field} updated succesfully!!`);
    } else {
      console.log(res.error);
      toast.error("there is an error!");
    }
  };

  useEffect(() => {
     ProjectList&&setProjectListData(ProjectList);
  },[ProjectList])

  let timeoutId;

  const handeleUpdate = (value, field, userId) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      updateData(value, field, userId);
    }, 1000);
  };

  const handelDrageEnd = async(result) => {
   if(!result.destination) return;

   const newList = Array.from(projectListData);
   const [reorderdList] = newList.splice(result.source.index,1);
   newList.splice(result.destination.index,0,reorderdList);
   setProjectListData(newList);

   console.log("newResult",newList);
   console.log("result",result)

   console.log("result",result?.destination.index)


   // updating source to destination
    await updateData(Number(result?.destination.index),'order',Number(result?.draggableId))
   
    // await updateData(Number(result?.source.index),'order',Number(result?.draggableId))
  };
  return (
    <div className="mt-10">
      <DragDropContext onDragEnd={handelDrageEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {projectListData?.map((project, index) => (
                <Draggable draggableId={project.id.toString()} index={index} key={project.id}>
                  {(provided) => (
                    <div
                      key={project.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="my-7 bg-[#f3f3f1] p-5 rounded-lg flex items-center gap-4"
                    >
                      <div {...provided.dragHandleProps}
                      >
                           <Grid/>
                      </div>

                      <div className="felx flex-col w-full" >
                        {project.id}
                      <div className="flex items-center gap-3">
                        <label htmlFor={`logo-upload${index}`}>
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
                            id={`logo-upload${index}`}
                            style={{ display: "none" }}
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event) =>
                              handelFileUpload(event, "logo", project.id)
                            }
                          />
                        </label>

                        <input
                          type="text"
                          onChange={(event) =>
                            handeleUpdate(
                              event.target.value,
                              "name",
                              project.id
                            )
                          }
                          defaultValue={project.name}
                          placeholder="Projects / startup"
                          className="input input-bordered w-full my-2 "
                        />
                      </div>

                      <input
                        type="text"
                        onChange={(event) =>
                          handeleUpdate(event.target.value, "desc", project.id)
                        }
                        defaultValue={project.desc}
                        placeholder="Tell me about your project"
                        className="input input-bordered w-full text-sm "
                      />

                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 mt-6">
                          <Link2
                            className={`h-12 w-12 p-3  rounded-md hover:bg-gray-200 ${
                              selectedOption === "link" + index && "bg-gray-300"
                            }`}
                            onClick={() => setSlectedOption("link" + index)}
                          />
                          <LayoutGrid
                            className={`h-12 w-12 p-3 rounded-md hover:bg-gray-200 ${
                              selectedOption === "category" + index &&
                              "bg-gray-300"
                            }`}
                            onClick={() => setSlectedOption("category" + index)}
                          />
                        </div>

                        <div className="flex justify-center items-center gap-3">
                          <button className="btn btn-error btn-sm">
                            <Trash2
                              onClick={() => OnProjectDelete(project.id)}
                            />
                          </button>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            defaultChecked={project.active}
                            onChange={(event) =>
                              handeleUpdate(
                                event.target.checked,
                                "active",
                                project.id
                              )
                            }
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
                              onChange={(event) =>
                                handeleUpdate(
                                  event.target.value,
                                  "url",
                                  project.id
                                )
                              }
                              key={1}
                            />
                          </label>
                        </div>
                      ) : selectedOption === "category" + index ? (
                        <div className="mt-2">
                          <select
                            className="select select-bordered w-full max-w-xs"
                            defaultValue={project.category}
                            onChange={(e) => {
                              updateData(
                                e.target.value,
                                "category",
                                project.id
                              );
                            }}
                          >
                            <option value="" disabled>
                              Select Project Type
                            </option>
                            <option value={"Educational"}>
                              📚 Educational
                            </option>
                            <option value={"Tools"}>🛠️ Tools</option>
                            <option value={"Saas"}>💻 SaaS</option>
                            <option value={"E-commerce"}>🛒 E-commerce</option>
                            <option value={"Portfolio"}>🖼️ Portfolio</option>
                            <option value={"SocialMedia"}>
                              🌐 Social Media
                            </option>
                            <option value={"Blog"}>✍️ Blog</option>
                            <option value={"Healthcare"}>🏥 Healthcare</option>
                            <option value={"Finance"}>💸 Finance</option>
                            <option value={"Productivity"}>
                              📈 Productivity
                            </option>
                            <option value={"Entertainment"}>
                              🎬 Entertainment
                            </option>
                            <option value={"Gaming"}>🎮 Gaming</option>
                            <option value={"ChatApp"}>💬 Chat App</option>
                            <option value={"RealEstate"}>🏠 Real Estate</option>
                            <option value={"Travel"}>✈️ Travel</option>
                            <option value={"Music"}>🎵 Music</option>
                            <option value={"FoodDelivery"}>
                              🍔 Food Delivery
                            </option>
                            <option value={"Fitness"}>🏋️ Fitness</option>
                            <option value={"News"}>📰 News</option>
                            <option value={"EventManagement"}>
                              🎉 Event Management
                            </option>
                          </select>
                        </div>
                      ) : null}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ProjectListEdit;
