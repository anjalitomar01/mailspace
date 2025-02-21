import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context.js';

import Header from './Header'
import { FaHome, FaUserFriends, FaEnvelope, FaCogs, FaCommentAlt, FaHandshake, FaCalendar, FaPhone } from "react-icons/fa";
const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-gray-100 p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
            <FaHome /> Home
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
            <FaUserFriends /> Contacts
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
            <FaEnvelope /> Campaigns
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
            <FaCogs /> Automations
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
          <FaCommentAlt /> Reports
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
            <FaHandshake /> Api integration
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
            <FaCalendar /> Documentation
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer">
            <FaPhone /> Sub Users
          </li>
        </ul>
        </div>
    );
  };
const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
   // console.log(logindata)

    const [data, setData] = useState(false);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }


    useEffect (() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, []);

    return (
        <>
          <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        {/* <header className="flex justify-between items-center bg-black text-white p-4 rounded-lg">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">Logout</button>
        </header> */}
        <Header/>
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-500"> Today's 
            Summary</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Do you have new contacts to organize?</h3>
                <p className="text-gray-500 text-sm">Use segmentation to send personalized messages and organize your contacts.</p>
                <button className="mt-2 text-blue-600">Segment contacts →</button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Expand your reach with sign-up forms</h3>
                <p className="text-gray-500 text-sm">Grow your audience, convert website visitors to subscribers, and collect valuable information.</p>
                <button className="mt-2 text-blue-600">Create sign-up form →</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

        </>
 )
}

export default Dashboard