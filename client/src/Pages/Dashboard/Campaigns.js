import React from "react";
import { MdCampaign } from "react-icons/md";

const Campaigns = () => {
  return (
          
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MdCampaign size={28} className="text-blue-500" /> Campaigns
      </h1>
      <p className="mt-2 text-gray-700">
        Manage and track all your marketing campaigns here. You can create, edit, and monitor campaign performance with detailed insights.
      </p>
           {/* CTA */}
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          + Create New Campaign
        </button>
      </div>
      {/* Campaign List */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Active Campaigns</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Email Marketing - 10,000 emails sent</li>
          <li>Social Media Ads - Running on Facebook & Instagram</li>
          <li>SEO Optimization - Improving website ranking</li>
        </ul>
      </div>

      
    </div>
  );
};

export default Campaigns;
