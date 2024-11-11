import { GetUserProjectClicks } from "../../../serverActions/QueryActions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  linearGradient,
} from "recharts";

const UniqueVisitors = () => {

  const [clickdata, setData] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getUniqueVisitors();
  }, [user]);

  const getUniqueVisitors = async () => {
    const res = await GetUserProjectClicks(
      user.primaryEmailAddress.emailAddress
    );

    if (res.status === 200) {
     

      console.log(res.clicksByMonth)
      const dataArray = Object.entries(res.clicksByMonth).map(
        ([month, count]) => ({
          count:count,
          month:month
        })
      );

      console.log("here is the unique visitors !!", dataArray);

      setData(dataArray);
    }
  };

  return (
    <div className="border rounded-lg p-7">
      <h2 className="font-bold text-lg my-3">Unique Visitors</h2>
      <ResponsiveContainer width={'100%'} height={250}>
        <AreaChart
          data={clickdata}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UniqueVisitors;
