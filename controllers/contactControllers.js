const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");
const { findByIdAndDelete } = require("../models/contactModel");
//@desc get all contact
//@route get /api/contacts
//@access public
const getcontact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });


  const message = "GET request successful";
  res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
  console.log("contact data ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are manadatory");
  }

  const conatct = await Contact.create
    (
      {
        name,
        email,
        phone,
        user_id: req.user.id,
      });
  res.status(201).json(conatct);
});

const getConatctbyId = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const contact = await Contact.findById(itemId);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found ");
  }

  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const contact = await Contact.findById(itemId);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found ");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("you are not authorised ");
  }

  const updatedcontact = await Contact.findByIdAndUpdate(itemId, req.body, {
    new: true,
  });
  res.status(200).json(updatedcontact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found ");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("you are not authorised ");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.send("deleted successfully");

});

module.exports = {
  getcontact,
  createContact,
  updateContact,
  deleteContact,
  getConatctbyId,
};
