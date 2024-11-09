"use server";
import prisma from "../db/index";

export const CreateNewProject = async (userId, Url) => {
  try {
    const data = await prisma.Projects.create({
      data: {
        url: Url,
        userId: userId,
      },
    });

    return { data: data, status: 200 };
  } catch (e) {
    return { data: e, status: 400 };
  }
};

export const GetUserProjects = async (userId) => {
  try {
    const data = await prisma.Projects.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        order: "asc", // Orders by `id` in ascending order; use 'desc' for descending
      },
    });
    return { data: data, status: 200 };
  } catch (e) {
    return { data: e, status: 400 };
  }
};

export const UpdateProject = async (data, field, projectId) => {
  try {
    const res = await prisma.Projects.update({
      where: {
        id: projectId,
      },
      data: {
        [field]: data,
      },
    });

    return { res: res, status: 200 };
  } catch (e) {
    return { error: e, status: 401 };
  }
};


export const DeleteProject = async (projectId) => {
    try{
         const res = await prisma.Projects.delete({
          where:{
            id:projectId
          }
         });

         return { data: res, status: 200 };
    }
    catch(e){
      console.error("Error deleting project:", error);
      return { data: error.message, status: 400 };
    }
}