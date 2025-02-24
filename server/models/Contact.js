const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    customerName: String,
    contacts: [
        {
            name: String,
            email: String,
            phone: String,
        },
    ],
});

module.exports = mongoose.model("Contact", contactSchema);
