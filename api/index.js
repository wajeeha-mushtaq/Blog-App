const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");


dotenv.config();
// send json to body otherwise 500 error
app.use(express.json());

// mongodb connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(console.log("Connected to database"))
.catch((err) => console.log(err));

// middleware for auth route
app.use("/api/auth", authRoute);
// middleware for users route
app.use("/api/users", userRoute);
// middleware for post route
app.use("/api/posts", postRoute);

// listen server
app.listen("5000", ()=>{
  console.log("Server is running");
});
