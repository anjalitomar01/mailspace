import React from "react";
import { HiDocumentText } from "react-icons/hi";

const Documentation = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <HiDocumentText size={28} className="text-blue-500" /> Documentation
      </h1>
      <p className="mt-2 text-gray-700">
        Find all guides, API references, and best practices for using the platform.
      </p>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>User Guide</li>
          <li>API Reference</li>
          <li>Integration Tutorials</li>
        </ul>
      </div>
    </div>
  );
};

export default Documentation;
