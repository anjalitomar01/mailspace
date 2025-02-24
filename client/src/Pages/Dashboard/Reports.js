import React, { useState } from "react";
import { 
  FiBarChart2, 
  FiDownload, 
  FiUsers, 
  FiMail, 
  FiMousePointer, 
  FiUserX, 
  FiUserCheck 
} from "react-icons/fi";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const sampleData = {
  subscriberGrowth: [
    { date: '2024-03-01', count: 1200 },
    { date: '2024-03-08', count: 1450 },
    { date: '2024-03-15', count: 1620 },
    { date: '2024-03-22', count: 1890 },
    { date: '2024-03-29', count: 2150 },
  ],
  campaignPerformance: [
    { name: 'Spring Sale', sent: 2500, opens: 1890, clicks: 420 },
    { name: 'Weekly Newsletter', sent: 3200, opens: 2450, clicks: 680 },
    { name: 'Product Launch', sent: 1800, opens: 1570, clicks: 350 },
  ],
  recentCampaigns: [
    { name: 'Summer Promotion', status: 'Delivered', sent: 4200, openRate: 62.4, clickRate: 18.3 },
    { name: 'Holiday Special', status: 'Scheduled', sent: 0, openRate: 0, clickRate: 0 },
    { name: 'Abandoned Cart', status: 'Completed', sent: 1500, openRate: 58.9, clickRate: 15.2 },
  ]
};

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [suppressionList, setSuppressionList] = useState([
    { id: 1, email: "user1@example.com", name: "John Doe", unsubscribeDate: "2024-03-15", resubscribed: false },
    { id: 2, email: "user2@example.com", name: "Jane Smith", unsubscribeDate: "2024-03-18", resubscribed: false },
    { id: 3, email: "user3@example.com", name: "Bob Johnson", unsubscribeDate: "2024-03-20", resubscribed: true },
  ]);

  const handleDownload = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    console.log(`Generating report from ${startDate} to ${endDate}`);
  };

  const filteredData = sampleData.subscriberGrowth.filter(item => {
    const itemDate = new Date(item.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
  });

  const handleResubscribe = (userId) => {
    setSuppressionList(list =>
      list.map(user => 
        user.id === userId ? { ...user, resubscribed: !user.resubscribed } : user
      )
    );
  };

  const handleExportSuppressionList = () => {
    const csvContent = [
      "Email,Name,Unsubscribe Date,Status",
      ...suppressionList.map(user => 
        `"${user.email}","${user.name}","${user.unsubscribeDate}",${user.resubscribed ? "Resubscribed" : "Unsubscribed"}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suppression-list.csv";
    a.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FiBarChart2 size={28} className="text-blue-500" /> Email Marketing Reports
      </h1>
      <p className="mt-2 text-gray-700">
        Analyze campaign performance, subscriber growth, and engagement metrics.
      </p>

      {/* Date Range and Download Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="date"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="hidden sm:block self-center">to</span>
              <input
                type="date"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
              />
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <FiDownload className="inline-block" />
            Download Report
          </button>
        </div>
      </div>

      {/* Reports Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Subscriber Growth Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h3 className="font-semibold flex items-center gap-2">
            <FiUsers className="text-blue-500" /> Subscriber Growth
          </h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Subscribers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <h3 className="font-semibold">Key Metrics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <div>
                <p className="text-sm text-gray-600">Open Rate</p>
                <p className="text-2xl font-bold">58.4%</p>
              </div>
              <FiMail className="text-blue-500 text-xl" />
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div>
                <p className="text-sm text-gray-600">Click-Through Rate</p>
                <p className="text-2xl font-bold">12.7%</p>
              </div>
              <FiMousePointer className="text-green-500 text-xl" />
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">4.2%</p>
              </div>
              <FiUsers className="text-purple-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h3 className="font-semibold mb-4">Campaign Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleData.campaignPerformance}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="opens" fill="#3b82f6" name="Opens" />
                <Bar dataKey="clicks" fill="#10b981" name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Recent Campaigns</h3>
          <div className="space-y-3">
            {sampleData.recentCampaigns.map((campaign, index) => (
              <div key={index} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{campaign.name}</p>
                  <span className={`text-sm px-2 py-1 rounded ${
                    campaign.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                  <div>
                    <p className="text-gray-500">Sent</p>
                    <p>{campaign.sent}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Open Rate</p>
                    <p>{campaign.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Click Rate</p>
                    <p>{campaign.clickRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suppression List Manager */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiUserX className="text-red-500" /> Suppression List Manager
          </h3>
          <button
            onClick={handleExportSuppressionList}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            <FiDownload className="inline-block" />
            Export List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unsubscribed Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {suppressionList.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-sm">{user.email}</td>
                  <td className="px-4 py-2 text-sm">{user.name}</td>
                  <td className="px-4 py-2 text-sm">{user.unsubscribeDate}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded ${user.resubscribed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.resubscribed ? 'Resubscribed' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleResubscribe(user.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded ${user.resubscribed ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                      disabled={user.resubscribed}
                    >
                      <FiUserCheck className="inline-block" />
                      {user.resubscribed ? 'Resubscribed' : 'Allow Resubscribe'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {suppressionList.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No unsubscribed users in the suppression list
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;