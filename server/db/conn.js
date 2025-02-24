const mongoose = require('mongoose');

const DB = "mongodb+srv://ravishekharvfirst:Anaconda@mailspace.odp28.mongodb.net/"; // 

mongoose.connect(DB)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("MongoDB Connection Error:", err));