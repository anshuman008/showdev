"use server";
import prisma from "../db/index";




export const GetUserProjectClicks = async (email) => {
  try {
    // Find the user and include projects and their clicks
    const user = await prisma.userInfo.findUnique({
      where: {
        email: email,
      },
      include: {
        projects: {
          include: {
            projectclicks: true,
          },
        },
      },
    });

    if (!user) {
      return { error: "No user found", status: 400 };
    }

    // Calculate the total clicks per month
    const clicksByMonth = user.projects.reduce((acc, project) => {
      project.projectclicks.forEach((click) => {
        if (acc[click.month]) {
          acc[click.month] += 1;
        } else {
          acc[click.month] = 1;
        }
      });
      return acc;
    }, {});

    return { clicksByMonth, status: 200 };
  } catch (e) {
    return { error: e.message, status: 400 };
  }
};


export const GetPorjectsClicks = async(email) => {
    try{
     const user = await prisma.userInfo.findUnique({
      where:{
        email:email
      },
      include: {
        projects: {
          include: {
            projectclicks: true,
          },
        },
      },
     })

     if (!user) {
      return { error: "No user found", status: 400 };
    }

    const projectObject = user.projects.map((project) =>({name:project.name,projectclicks:project.projectclicks.length}));

    return { data:projectObject, status: 200 };
    }
    catch(e){
      return { error:e?.message, status: 400 };

    }
}
