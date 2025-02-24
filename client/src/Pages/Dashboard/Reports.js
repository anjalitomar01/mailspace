import React from "react";
import { FiBarChart2 } from "react-icons/fi";

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FiBarChart2 size={28} className="text-blue-500" /> Reports
      </h1>
      <p className="mt-2 text-gray-700">
        View detailed reports and analytics for your campaigns, users, and system performance.
      </p>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Recent Reports</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Marketing Campaign Analysis</li>
          <li>User Engagement Trends</li>
          <li>System Performance Metrics</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;
