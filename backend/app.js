const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require ('cors');
const authRouter = require("./routes/authRoutes")

const app = express();
connectDB();

port = 5000;
const allowedOrigins = ["http://localhost:5173"];
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

app.get("/", (req,res) => {
    console.log("hello from backend ");
    res.send("running server");
})

app.use('/api/auth', authRouter);

app.listen(port , (req, res ) => {
    console.log(`server running at : ${port} `);
})