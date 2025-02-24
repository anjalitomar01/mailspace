import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", requests: 1400, delivered: 1200, opened: 900 },
  { name: "Tue", requests: 1300, delivered: 1100, opened: 800 },
  { name: "Wed", requests: 1200, delivered: 1000, opened: 750 },
  { name: "Thu", requests: 1100, delivered: 900, opened: 700 },
  { name: "Fri", requests: 1000, delivered: 850, opened: 650 },
  { name: "Sat", requests: 900, delivered: 800, opened: 600 },
  { name: "Sun", requests: 800, delivered: 700, opened: 500 },
];

const Activity= () => {
  const [selected, setSelected] = useState("Week");

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Hello Muh! Here's your recent email activity.</h1>

      <div className="grid grid-cols-6 gap-4 mb-6">
        {[
          { label: "Requests", value: "5,701" },
          { label: "Delivered", value: "95.58%" },
          { label: "Opened", value: "149.66%" },
          { label: "Clicked", value: "17.86%" },
          { label: "Bounces", value: "0.39%" },
          { label: "Spam Reports", value: "0.00%" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-sm text-gray-500 font-semibold">{stat.label}</p>
            <p className="text-lg font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="#0088FE" strokeWidth={2} />
            <Line type="monotone" dataKey="delivered" stroke="#00C49F" strokeWidth={2} />
            <Line type="monotone" dataKey="opened" stroke="#FFBB28" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Activity;






