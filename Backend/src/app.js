const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');

// require all routes
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interviewReport.routes');


const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

// use routes here
app.use("/api/auth",authRouter);
app.use('/api/interview',interviewRouter);

module.exports = app;