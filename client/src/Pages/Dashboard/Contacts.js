import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Contacts = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [contacts, setContacts] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: ".csv, .xlsx, .txt",
        onDrop: (acceptedFiles) => {
            setSelectedFile(acceptedFiles[0]);
        },
    });

    const handleUpload = async () => {
        if (!selectedFile || !customerName) {  // ✅ Corrected
            alert("Please provide a file and customer name.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);  // ✅ Corrected
        formData.append("customerName", customerName);

        try {
            const response = await axios.post("http://localhost:8010/api/contacts/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(response.data.message);
            fetchContacts(); // Reload contacts after upload
        } catch (error) {
            alert("Error uploading contacts");
            console.error(error);
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await axios.get("http://localhost:8010/api/contacts");
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts", error);
        }
    };

    useEffect(() => {
        fetchContacts(); // Load contacts on page load
    }, []);

    return (
        <div className="p-5 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-3">📇 Contacts</h2>
            <p>Upload CSV, XLSX, or TXT files.</p>

            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border p-2 mb-2 w-full"
            />

            <div {...getRootProps()} className="border-dashed border-2 p-5 text-center cursor-pointer mb-3">
                <input {...getInputProps()} />
                Drag & drop files here, or click to select
            </div>

            <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded">
                Upload to Database
            </button>

            <h3 className="text-lg font-bold mt-5">Stored Contacts</h3>
            <ul className="mt-3">
                {contacts.map((customer) => (
                    <li key={customer._id} className="border p-2 rounded mb-2">
                        <strong>{customer.customerName}</strong>
                        <ul>
                            {customer.contacts.map((contact, index) => (
                                <li key={index}>{contact.name} - {contact.email} - {contact.phone}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;



