import React from "react";
import { BsCodeSlash } from "react-icons/bs";

const APIIntegration = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <BsCodeSlash size={28} className="text-blue-500" /> API Integration
      </h1>
      <p className="mt-2 text-gray-700">
        Connect with third-party APIs and streamline data exchange across platforms.
      </p>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Available APIs</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>REST API Documentation</li>
          <li>Webhooks & Callbacks</li>
          <li>OAuth Authentication</li>
        </ul>
      </div>
    </div>
  );
};

export default APIIntegration;
