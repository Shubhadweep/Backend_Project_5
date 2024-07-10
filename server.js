require('dotenv').config();
const express = require('express');
const server = express();
const authModel = require('./Model/authModel');
const authRouter = require('./Router/authRouter');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const Path = require('path');
const PORT = process.env.PORT || 5900;

server.set('view engine','ejs');
server.set('views','View');

server.use(express.urlencoded({extended:true}));
server.use(express.static(Path.join(__dirname,"Public")));

server.use(cookie());
server.use(authRouter);
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("The Database Connection is Successfull");
    server.listen(PORT,()=>{
        console.log(`The Server is running At ${PORT}`);
    })
}).catch(error=>{
    console.log("Failed to Connect With the Database",error);
})