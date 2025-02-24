// const express = require("express");
// const multer = require("multer");
// const csv = require("csv-parser");
// const xlsx = require("xlsx");
// const fs = require("fs");
// const Contact = require("../models/Contact");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // Upload Route
// router.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//         if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//         let contacts = [];
//         const filePath = req.file.path;
//         const customerName = req.body.customerName || "Unknown"; // Get customer name from request

//         // Read CSV File
//         if (req.file.mimetype === "text/csv") {
//             fs.createReadStream(filePath)
//                 .pipe(csv())
//                 .on("data", (row) => contacts.push(row))
//                 .on("end", async () => {
//                     await saveContacts(customerName, contacts);
//                     fs.unlinkSync(filePath);
//                     res.json({ message: "Contacts uploaded successfully" });
//                 });
//         }
//         // Read XLSX File
//         else if (
//             req.file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//         ) {
//             const workbook = xlsx.readFile(filePath);
//             const sheet = workbook.Sheets[workbook.SheetNames[0]];
//             contacts = xlsx.utils.sheet_to_json(sheet);
//             await saveContacts(customerName, contacts);
//             fs.unlinkSync(filePath);
//             res.json({ message: "Contacts uploaded successfully" });
//         }
//         // Read TXT File
//         else if (req.file.mimetype === "text/plain") {
//             const fileData = fs.readFileSync(filePath, "utf-8");
//             contacts = fileData
//                 .split("\n")
//                 .map((line) => ({ name: line.trim() }))
//                 .filter((entry) => entry.name);
//             await saveContacts(customerName, contacts);
//             fs.unlinkSync(filePath);
//             res.json({ message: "Contacts uploaded successfully" });
//         } else {
//             res.status(400).json({ message: "Invalid file format" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// // Helper function to save contacts
// async function saveContacts(customerName, contacts) {
//     let customer = await Contact.findOne({ customerName });

//     if (!customer) {
//         customer = new Contact({ customerName, contacts });
//     } else {
//         customer.contacts.push(...contacts);
//     }

//     await customer.save();
// }

// module.exports = router;
