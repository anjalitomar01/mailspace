import React, { createContext, useState, useEffect } from 'react'


export const LoginContext = createContext("");

const Context = ({children}) => {

    const [logindata,setLoginData] = useState("");
    const [credits, setCredits] = useState(0);

    // Local storage se credits load karna
    useEffect(() => {
        const storedCredits = localStorage.getItem("credits");
        if (storedCredits) {
            setCredits(parseInt(storedCredits));
        }
    }, []);

    // ✅ Credits ko ADD karne ka function
    const addCredits = (creditAmount) => {
        setCredits((prevCredits) => prevCredits + creditAmount);
        localStorage.setItem("credits", credits + creditAmount); // ✅ Local storage me save
    };

  return (
    <>
    <LoginContext.Provider value={{logindata,setLoginData}}>
        {children}
    </LoginContext.Provider>
    </>
  )
}

export default Context