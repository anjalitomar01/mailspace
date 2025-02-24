const mongoose = require("mongoose");
//const DB = "mongodb+srv://ravishekharvfirst:Anaconda@mailspace.odp28.mongodb.net/";

const contactSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true, index: true },
    contacts: [
        {
            type: mongoose.Schema.Types.Mixed, // Allows any structure for contacts
            required: true,
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);


