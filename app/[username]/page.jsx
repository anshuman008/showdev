"use client";
import React from "react";
import useUserInfo from "../../store/userInfo";
import UserDetailsInfo from "./_components/UserDetailsInfo";
import ProjectList from "./_components/PojectList";

const Page = () => {
  const { userInfo, error, loading } = useUserInfo();

  console.log("here is the error details:", error);

  if (loading) {
    return (
      <div className="p-3 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>

          <div className="skeleton h-32 w-full"></div>

          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2>User not found!!</h2>
      </div>
    );
  }

  return (
    <div className="p-3 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen">
      <div>
        <UserDetailsInfo userInfo={userInfo} />
      </div>

      <div>
        <ProjectList projectList={userInfo.projects} />
      </div>
    </div>
  );
};

export default Page;
