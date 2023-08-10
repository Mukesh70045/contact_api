const mongoose = require("mongoose");
const userSchema = new mongoose.Schema
  (
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Contact",

      },
      name: {
        type: String,
        required: [true, "please add the contact name "],
      },

      email: {
        type: String,
        required: [true, "please add the contact email address "],
      },

      phone: {
        type: String,
        required: [true, "please add the contact phone number "],
      },
    },
    {
      timestamps: true,
    }
  );

// Create a model using the schema
const Contact = mongoose.model("Contact", userSchema);

module.exports = Contact;
