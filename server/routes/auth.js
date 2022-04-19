require("../config/database").connect();
require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", async (req,res)=>{
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    // check if user already exist
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    // Create jwt token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    // return new user
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome ");
});

module.exports = router
