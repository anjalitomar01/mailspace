import React from "react";
import { RiRobot2Fill } from "react-icons/ri";

const Auto = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <RiRobot2Fill size={28} className="text-blue-500" /> Automations
      </h1>
      <p className="mt-2 text-gray-700">
        Automate workflows and repetitive tasks with AI-driven automation tools.
      </p>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Recent Automations</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Email Response Automation</li>
          <li>CRM Data Sync</li>
          <li>AI Chatbot Integration</li>
        </ul>
      </div>
    </div>
  );
};

export default Auto;
