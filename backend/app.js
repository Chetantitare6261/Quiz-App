const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require ('cors');
const authRouter = require("./routes/authRoutes")

const app = express();
connectDB();

port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true }));

app.get("/", (req,res) => {
    console.log("hello from backend ");
    res.send("running server");
})

app.use('/api/auth', authRouter);

app.listen(port , (req, res ) => {
    console.log(`server running at : ${port} `);
})