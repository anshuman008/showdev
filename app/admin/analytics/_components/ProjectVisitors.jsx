import { GetPorjectsClicks } from "../../../serverActions/QueryActions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ProjectVisitors = () => {
  const [clickdata, setData] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getUniqueVisitors();
  }, [user]);

  const getUniqueVisitors = async () => {
    const res = await GetPorjectsClicks(user.primaryEmailAddress.emailAddress);

    if (res.status === 200) {
      setData(res.data);
      console.log(res);
    }
  };

  return (
    <div className="border rounded-lg p-7">

   <h2 className="font-bold text-lg my-3">Project Visitors</h2>

    <ResponsiveContainer width={'100%'} height={250}>
      <BarChart width={730} height={250} data={clickdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="projectclicks" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default ProjectVisitors;
