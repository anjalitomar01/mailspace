import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context.js';
import Contacts from "../Pages/Dashboard/Contacts.js"
import Header from './Header'
import Activity from "../Pages/Dashboard/Activity.js";
import APIIntegration from "../Pages/Dashboard/APIIntegration.js";
import Auto from "../Pages/Dashboard/Auto.js";
import Campaigns from "../Pages/Dashboard/Campaigns.js";
import Documentation from"../Pages/Dashboard/Documentation.js";
import Reports from "../Pages/Dashboard/Reports.js";
import SubUsers from "../Pages/Dashboard/SubUsers.js";




//react icons
import { AiFillHome } from "react-icons/ai"; 
import { MdCampaign } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri"; 
import { FiBarChart2 } from "react-icons/fi"; 
import { BsCodeSlash } from "react-icons/bs"; 
import { HiDocumentText } from "react-icons/hi"; 
import { FaUsers } from "react-icons/fa"; 
import { MdContacts } from "react-icons/md"; 
const Sidebar = ({ setActivePage }) => {
    return (
      <div className="w-64 h-screen bg-gray-100 p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-5" onClick={() => setActivePage("activity")}><AiFillHome /> Home</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer" onClick={() => setActivePage("Activity")}>
          <AiFillHome /> Home
          
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer" onClick={() => setActivePage("contacts")}>
           < MdContacts/> Contacts
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"onClick={() => setActivePage("Campaigns")}>
            <MdCampaign/> Campaigns
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"onClick={() => setActivePage("Automations")}>
            <RiRobot2Fill/> Automations
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"onClick={() => setActivePage("Reports")}>
          <FiBarChart2 /> Reports
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"onClick={() => setActivePage("API Integration")}>
            <BsCodeSlash /> Api & SMTP Integration
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"onClick={() => setActivePage("Documentation")}>
            <HiDocumentText /> Documentation
          </li>
          <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"onClick={() => setActivePage("SubUsers")}>
            <FaUsers/> Sub Users
          </li>
        </ul>
        </div>
    );
  };
const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
   // console.log(logindata)

    const [data, setData] = useState(false);
    const [activePage, setActivePage] = useState("Activity");

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
            setLoginData(data);
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
          <div className="flex h-screen w-screen overflow-hidde">
      <Sidebar setActivePage={setActivePage}/>
      <div className="flex-1 p-6 bg-gray-50 h-screen overflow-y-auto">
        {/* <header className="flex justify-between items-center bg-black text-white p-4 rounded-lg">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">Logout</button>
        </header> */}
        <Header/>
       

       
        <div className="mt-5">
        {activePage === "Activity" && <Activity/>}
          {activePage === "contacts" && <Contacts />}
          {activePage === "Campaigns" && <Campaigns />}
          {activePage === "Automations" && < Auto />}
          {activePage === "Reports" && <Reports/>}
          {activePage === "API Integration" && <APIIntegration />}
          {activePage === "Documentation" && <Documentation />}
          {activePage === "SubUsers" && <SubUsers />}




        </div>
        
      </div>
    </div>

        </>
 )
}

export default Dashboard