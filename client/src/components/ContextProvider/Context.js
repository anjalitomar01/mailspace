import React, { createContext, useState, useEffect } from 'react'


export const LoginContext = createContext("");

const Context = ({children}) => {

    const [logindata,setLoginData] = useState("");
    const [credits, setCredits] = useState(0);
    const [contacts, setContacts] = useState([]); // ✅ Contacts state

    // Local storage se credits load karna
    useEffect(() => {
        const storedCredits = localStorage.getItem("credits");
        if (storedCredits) {
            setCredits(parseInt(storedCredits));
        }
    }, []);




    // ✅ Contacts ko fetch karne ka function 
    const fetchContacts = async () => {
      try {
          const response = await fetch("http://localhost:8010/api/contacts");
          const data = await response.json();
          setContacts(data); // ✅ Contacts update
      } catch (error) {
          console.error("Error fetching contacts:", error);
      }
  };

  // ✅ Page load hone pe contacts fetch honge
  useEffect(() => {
      fetchContacts();
  }, []);








     // ✅ Credits ko ADD karne ka function
     const addCredits = (creditAmount) => {
        setCredits((prevCredits) => prevCredits + creditAmount);
        localStorage.setItem("credits", credits + creditAmount); // ✅ Local storage me save
    };

// ✅ Contacts ko upload karne ka function
const uploadContacts = async (customerName, file) => {
  const formData = new FormData();
  formData.append("customerName", customerName);
  formData.append("file", file);

  try {
      const response = await fetch("/api/contacts/upload", {
          method: "POST",
          body: formData,
      });

      const data = await response.json();
      if (response.ok) {
          alert("Contacts uploaded successfully!");
          fetchContacts(); // ✅ Contacts list refresh
      } else {
          alert("Error uploading contacts: " + data.message);
      }
  } catch (error) {
      console.error("Upload error:", error);
  }
};



    
  return (
    <>
    <LoginContext.Provider value={{logindata,setLoginData,credits, addCredits, contacts, uploadContacts}}>
        {children}
    </LoginContext.Provider>
    </>
  )
}

export default Context