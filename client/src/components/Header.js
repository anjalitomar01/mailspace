import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context.js';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate , NavLink } from "react-router-dom"
import  { useState } from "react";
import  { useEffect } from 'react';
const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();
    const [credits, setCredits] = useState(0);//credits

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

// Fetch updated credits when logindata changes
useEffect(() => {
    if (logindata && logindata.ValidUserOne) {
        setCredits(logindata.ValidUserOne.credits);
    }
}, [logindata]);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }

    //credits
    const addCredits = async () => {
        if (!logindata || !logindata.ValidUserOne) {
            console.log("User data is not available");
            return;
        }
        

        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/update-credits", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ credits: logindata.ValidUserOne.credits + 10 }) // Incrementing by 10
        });

        const data = await res.json();
        if (data.message) {
            setLoginData({ ...logindata, ValidUserOne: { ...logindata.ValidUserOne, credits: data.credits } });
            setCredits(data.credits); // Update the credits in the UI
        }
    };
    
    
    
    return (
        <>
            <header className=" bg-black text-white p-4 rounded-lg " >
                <nav>

                    <NavLink to="/dash"><h1 style={{ color: "white", fontWeight: "bold", fontSize: 20, }}>Dashboard</h1></NavLink>

                    {
                        logindata.ValidUserOne ? <p className='nam' style={{ background: "black", fontWeight: "bold", textTransform: "capitalize" }}>{"Hello" +"  "+ logindata.ValidUserOne.fname}</p> :
                            ""

                    }
                     {/* Button to display credits and add credits */}
                    <button onClick={addCredits}  className=" bg-black text-white p-4 rounded-lg" style={{ background: "black", fontWeight: "bold", textTransform: "capitalize" }}>Credits: {credits}</button>
                    
                   
                
                    {/* <title style={{color: "white"}}>credits</title> credits addition */}

                     {/* Logout Button */}
                    <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700" onClick={handleClick} >Logout</button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
            goError()
            handleClose()
        }}>Profile</MenuItem>
    </>
)
}

</Menu>
</nav>
</header>
       </>
    )
}
export default Header