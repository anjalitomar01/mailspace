import React, { useState } from "react";
import { FaUsers, FaUserPlus, FaTrash, FaEdit } from "react-icons/fa";

const SubUsers = () => {
  // Sample sub-users data
  const [subUsers, setSubUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Editor", email: "jane@example.com" },
    { id: 3, name: "Robert Brown", role: "Viewer", email: "robert@example.com" },
  ]);

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FaUsers size={28} className="text-blue-500" /> Sub Users Management
      </h1>
      <p className="mt-2 text-gray-700">
        Manage sub-users, assign roles, and control access to your platform.
      </p>

      {/* Sub Users Table */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">User List</h2>
          <button className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md">
            <FaUserPlus className="mr-2" /> Add User
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subUsers.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 flex justify-center gap-3">
                  <button className="text-blue-500">
                    <FaEdit />
                  </button>
                  <button className="text-red-500">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubUsers;

