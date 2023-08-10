const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateMiddlewaretoken")

const { registeruser, loginuser, currentuser } = require("../controllers/userControllers.js");

router.post("/register", registeruser);

router.post("/login", loginuser);

router.get("/current", validateToken, currentuser);

module.exports = router;
