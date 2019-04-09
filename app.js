// Package Imports
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const http = require('http').Server(express);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// Allows servers to communicate with each other
app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

//Database setup
// mongo "mongodb+srv://cluster0-on2wx.mongodb.net/test" --username admin FOR TERMINAL
//mongodb+srv://admin:qMyzMeqozIf2Db1T@cluster0-on2wx.mongodb.net/test?retryWrites=true
const uri = 'mongodb+srv://admin:qMyzMeqozIf2Db1T@cluster0-on2wx.mongodb.net/test?retryWrites=true';
mongoose.connect(uri, { useNewUrlParser:true}).then(()=>{
  console.log('connected to the database');
}).catch(()=>{
  console.log('could not connect to the database');
});

/**
 * -----------------------------
 * Route Imports
 * -----------------------------
 */
const userRoute = require('./server/routes/user');
const compilerRoute = require('./server/routes/compiler');
const projectRoute = require('./server/routes/project');

app.use('/api/user',userRoute);
app.use('/api/compiler', compilerRoute);
app.use('/api/project', projectRoute);


/**
 * Socket Set-up
 */
io.on("connection", (socket)=>{
  console.log("Connection has been established on localhost:4444");

  socket.on("disconnect", ()=>{
    console.log("Connection has been aborted");
  });

});

http.listen(4444, ()=>{
  console.log("Servering on localhost:4444");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.sendStatus(err.status)
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
