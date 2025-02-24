const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");


const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const Contact = require("../models/Contact"); // Your MongoDB Contact model










// const keysecret = process.env.SECRET_KEY
const keysecret = "info@mailspace.co.in"


//email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
         user:"anjalithakur96505@gmail.com",
          pass:"oegz sbce difu oyed"
      
    }
}) 

//new email config
// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false,
//     auth:{
//          user:"7b1216001@smtp-brevo.com",
//          pass:"z5X183LH9kaxPjMf",
              
//         }
// })
// transporter = nodemailer.createTransport({
//     host: 'us1-mta1.sendclean.net',
//     port: 587,
//     secure: false, // Use SSL
//     auth: {
//       user: 'smtp72037479',
//       pass: 'P83N0QyDOj'
//     }
//   });




// for user registration

router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword, credits:10 //Default credits
            });

            // here password hasing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});




// user Login

router.post("/login", async (req, res) => {
   // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }else{
            res.status(401).json({status:401,message:"invalid details"});
        }

    } catch (error) {
        res.status(401).json({status:401,error});
        console.log("catch block");
    }
});



// user valid
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


// user logout

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

//update credits API
router.put("/update-credits", authenticate, async (req, res) => {
    try {
        const userId = req.userId; // Corrected user ID extraction
        const { credits } = req.body;

        if (typeof credits !== "number") {
            return res.status(400).json({ message: "Invalid credits value" });
        }

        const user = await userdb.findByIdAndUpdate(
            userId,
            { $inc: { credits: credits } }, // Increment credits
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ message: "Credits updated successfully", credits: user.credits });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// send email Link For reset Password
router.post("/sendpasswordlink",async(req,res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await userdb.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        
        const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:"info@premiumhomez.in",
                to:email,
                subject:"Sending Email For password Reset",
                 text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            };
            
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Successfully"})
                }
            })
                 

        }

    } catch (error) {
        res.status(401).json({status:401,message:"Invalid user"})
    }

});


// verify user for forgot password time
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});






// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

//const upload = multer({ storage });

// Multer setup for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Upload Route with Debug Logs
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "❌ No file uploaded" });

        console.log("✅ File received:", req.file.originalname);

        const customerName = req.body.customerName || "Unknown";
        let contacts = [];

        // ✅ Parse CSV
        if (req.file.mimetype === "text/csv") {
            console.log("📂 Processing CSV file...");
            const csvData = req.file.buffer.toString("utf8");
            const lines = csvData.split("\n");
            const headers = lines[0].split(",");

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(",");
                let contact = {};
                headers.forEach((header, index) => {
                    contact[header.trim()] = values[index] ? values[index].trim() : "";
                });
                if (Object.keys(contact).length > 0) contacts.push(contact);
            }
        }
        // ✅ Parse XLSX
        else if (
            req.file.mimetype ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            console.log("📂 Processing XLSX file...");
            const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            contacts = xlsx.utils.sheet_to_json(sheet);
        }
        // ✅ Parse TXT
        else if (req.file.mimetype === "text/plain") {
            console.log("📂 Processing TXT file...");
            const fileData = req.file.buffer.toString("utf8");
            contacts = fileData
                .split("\n")
                .map((line) => ({ name: line.trim() }))
                .filter((entry) => entry.name);
        } else {
            return res.status(400).json({ message: "❌ Invalid file format" });
        }

        // ✅ Debugging Logs
        console.log("✅ Parsed Contacts:", contacts);

        if (contacts.length === 0) {
            return res.status(400).json({ message: "❌ No contacts found in file" });
        }

        // ✅ Save to MongoDB
        await saveContacts(customerName, contacts);
        res.json({ message: "✅ Contacts uploaded successfully!", totalContacts: contacts.length });
    } catch (error) {
        console.error("❌ Upload error:", error);
        res.status(500).json({ message: "❌ Server error", error: error.message });
    }
});

module.exports = router;


// 2 way connection
// 12345 ---> e#@$hagsjd
// e#@$hagsjd -->  12345

// hashing compare
// 1 way connection
// 1234 ->> e#@$hagsjd
// 1234->> (e#@$hagsjd,e#@$hagsjd)=> true