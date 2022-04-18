require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

const mongoose = require('mongoose');
const authRoute = require("./routes/auth");

app.use(express.json());

// middleware for auth route
app.use("/", authRoute);

module.exports = app;
