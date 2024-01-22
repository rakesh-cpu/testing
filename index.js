require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const profileRoute = require("./routes/profile");

// database connection
connection();
console.log("connected to the db")

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/registration", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/profile",profileRoute);

app.get("/",(req,res)=>{
    console.log("im in get method");
    res.send("Hello from server:");
})


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
