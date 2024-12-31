"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { CheckUser } from "./serverActions/CheckUser";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const res = await CheckUser(user?.primaryEmailAddress?.emailAddress);

    if (res) {
      router.replace("/admin");
    }
    else{
      router.replace("/create")
    }
  };

  return (
    // design the page here
    <div className="flex h-screen justify-center items-center">
     <div>
        Loading...
     </div>
    </div>
  );
};

export default Page;
