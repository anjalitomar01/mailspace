require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const port = 8010;


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})