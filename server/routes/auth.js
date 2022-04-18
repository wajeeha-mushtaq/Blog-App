require("../config/database").connect();
require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", async (req,res)=>{
  // Our register logic starts here
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
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
  // Our register logic ends here
  // try{
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPass = await bcrypt.hash(req.body.password, salt);
  //   // create new user
  //   const newUser = new User({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: hashedPass,
  //   });

  //   // await until newUser create and save
  //   const user = await newUser.save();
  //   res.status(200).json(user);
  // } catch(err){
  //   res.status(500).json(err);
  // }
});

router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
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

// LOGIN
// router.post("/login", async (req,res) => {
//   try{
//     const user = await User.findOne({username: req.body.username})
//     !user && res.status(400).json("Wrong credentials")

//     const validated = await bcrypt.compare(req.body.password, user.password)
//     !validated && res.status(400).json("Wrong credentials")

//     const {password, ...others} = user._doc;
//     res.status(200).json(others);
//   }
//   catch(err){
//     res.status(500).json(err);
//   }
// })


module.exports = router
