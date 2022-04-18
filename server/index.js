const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.MONGO_URL || API_PORT;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const mongoose = require('mongoose');
// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/users");
// const postRoute = require("./routes/posts");
// const multer  = require('multer');
// const path = require('path');

// dotenv.config();
// // send json to body otherwise 500 error
// app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));

// // mongodb connection
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
// .then(console.log("Connected to database"))
// .catch((err) => console.log(err));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });

// // middleware for auth route
// app.use("/api/auth", authRoute);
// // middleware for users route
// app.use("/api/users", userRoute);
// // middleware for post route
// app.use("/api/posts", postRoute);

// // listen server
// app.listen("5000", ()=>{
//   console.log("Server is running");
// });
