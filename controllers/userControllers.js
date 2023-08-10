const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// @desc Register a user
//@route Post /api/users/register
// @access public

const registeruser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  const userAvailble = await User.findOne({ email });
  if (userAvailble) {
    res.status(400);
    throw new Error("this email is already registered");
  }
  // hash passwod 
  const hashpassword = await bcrypt.hash(password, 10);
  console.log("has password is", hashpassword);
  const user = await User.create({
    username,
    email,
    password: hashpassword,

  })
  console.log(`user is created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  }
  else {
    res.status(400);
    throw new Error("user data us not valid");
  }

  // res.json({ message: "Register the user " });
});

const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are nandatory");
  }
  const user = await User.findOne({ email });
  // compare the password 
  if (user && (await bcrypt.compare(password, user.password))) {

    const accestoken = jwt.sign
      (
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,

          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
    res.status(200).json({ accestoken });

  }
  else {
    res.status(401);
    throw new Error("email or password are not correct");
  }

});

const currentuser = asyncHandler(async (req, res) => {

  res.json(req.user);
});

module.exports =
{
  registeruser,
  loginuser,
  currentuser
};
