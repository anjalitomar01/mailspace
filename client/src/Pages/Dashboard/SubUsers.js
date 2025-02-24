import React, { useState } from "react";
import { FaUsers, FaUserPlus, FaTrash, FaEdit, FaCoins } from "react-icons/fa";

const SubUsers = ({ isMasterUser }) => {
  const [subUsers, setSubUsers] = useState([
    { 
      id: 1, name: "John Doe", role: "Admin", email: "john@example.com", contact: "9876543210",
      permissions: {
        viewReports: true, sendCampaigns: true, uploadContacts: true, changeAPI: true,
        downloadReports: false, downloadContacts: false, modifyContacts: true,
        activateUser: true
      }, credits: 100, active: true
    },
    { 
      id: 2, name: "Jane Smith", role: "Editor", email: "jane@example.com", contact: "9234567890",
      permissions: {
        viewReports: true, sendCampaigns: false, uploadContacts: true, changeAPI: false,
        downloadReports: true, downloadContacts: false, modifyContacts: false,
        activateUser: false
      }, credits: 50, active: true
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: "", role: "", email: "", contact: "", permissions: {}, active: true
  });

  const [editingUser, setEditingUser] = useState(null);
  const [creditUpdate, setCreditUpdate] = useState(0);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Toggle permission
  const togglePermission = (perm) => {
    setNewUser({
      ...newUser,
      permissions: { ...newUser.permissions, [perm]: !newUser.permissions[perm] }
    });
  };

  // Add new user
  const addUser = () => {
    if (!newUser.name || !newUser.role || !newUser.email || !newUser.contact) return;
    setSubUsers([...subUsers, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", role: "", email: "", contact: "", permissions: {}, active: true });
  };

  // Edit user
  const startEditing = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  // Save changes
  const saveEdit = () => {
    setSubUsers(subUsers.map((user) => (user.id === editingUser.id ? { ...newUser } : user)));
    setEditingUser(null);
    setNewUser({ name: "", role: "", email: "", contact: "", permissions: {}, active: true });
  };

  // Delete user
  const deleteUser = (id) => {
    setSubUsers(subUsers.filter((user) => user.id !== id));
  };

  // Master User: Manage Credits
  const updateCredits = (id, amount) => {
    setSubUsers(subUsers.map((user) => 
      user.id === id ? { ...user, credits: user.credits + amount } : user
    ));
    setCreditUpdate(0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FaUsers size={28} className="text-blue-500" /> Sub Users Management
      </h1>
      <p className="mt-2 text-gray-700">
        Manage sub-users, assign roles, and control access to your platform.
      </p>

      {/* Add/Edit User Form */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">{editingUser ? "Edit User" : "Add New User"}</h2>
        <div className="flex flex-col gap-3">
          <input type="text" name="name" value={newUser.name} onChange={handleInputChange} placeholder="Full Name" className="border p-2 rounded" />
          <input type="text" name="role" value={newUser.role} onChange={handleInputChange} placeholder="Role" className="border p-2 rounded" />
          <input type="email" name="email" value={newUser.email} onChange={handleInputChange} placeholder="Email" className="border p-2 rounded" />
          <input type="text" name="contact" value={newUser.contact} onChange={handleInputChange} placeholder="Contact Number" className="border p-2 rounded" />

          {/* Permissions */}
          <h3 className="text-lg font-semibold mt-3">Permissions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "viewReports", label: "Can View Reports" },
              { key: "sendCampaigns", label: "Can Send Campaigns" },
              { key: "uploadContacts", label: "Can Upload Contacts" },
              { key: "changeAPI", label: "Can Modify API Credentials" },
              { key: "downloadReports", label: "Can Download Reports" },
              { key: "downloadContacts", label: "Can Download Contacts" },
              { key: "modifyContacts", label: "Can Modify Contact List" },
              { key: "activateUser", label: "Can Activate/Deactivate User" }
            ].map((perm) => (
              <label key={perm.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newUser.permissions[perm.key] || false}
                  onChange={() => togglePermission(perm.key)}
                />
                {perm.label}
              </label>
            ))}
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={newUser.active} onChange={() => setNewUser({ ...newUser, active: !newUser.active })} />
            Activate User
          </label>

          <button onClick={editingUser ? saveEdit : addUser} className="bg-blue-500 text-white px-3 py-2 rounded-md mt-3">
            {editingUser ? "Save Changes" : <><FaUserPlus className="mr-1 inline" /> Add User</>}
          </button>
        </div>
      </div>

      {/* Sub Users Table */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">User List</h2>
        <table className="w-full border-collapse border border-gray-300 mt-3">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Email</th>
              {isMasterUser && <th className="border p-2">Credits</th>}
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subUsers.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">{user.email}</td>
                {isMasterUser && (
                  <td className="border p-2 flex items-center justify-center gap-2">
                    {user.credits}
                    <input type="number" min="0" className="w-16 border p-1" onChange={(e) => setCreditUpdate(Number(e.target.value))} />
                    <button className="text-green-500" onClick={() => updateCredits(user.id, creditUpdate)}>
                      <FaCoins />
                    </button>
                  </td>
                )}
                <td className="border p-2 flex justify-center gap-3">
                  <button className="text-blue-500" onClick={() => startEditing(user)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500" onClick={() => deleteUser(user.id)}>
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
