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

/**
 * Connecting our application to the MongoDB database that
 * was created
 */
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

// Route that is used to implement any logic for the user
const userRoute = require('./routes/user');
// Route that is used to implement any logic for compiling code
const compilerRoute = require('./routes/compiler');
// Route that is used to implement any logic for projects
const projectRoute = require('./routes/project');

// Import the routes so the application can use them
app.use('/api/user',userRoute);
app.use('/api/compiler', compilerRoute);
app.use('/api/project', projectRoute);


/**
 * Socket Set-up
 */

io.on("connection", (socket)=>{
  console.log("Connection has been established on localhost:4444");

  // Listens to any users that leaves the website
  socket.on("disconnect", ()=>{
    console.log("Connection has been aborted");
  });

  // Listens to any users that joins a project
  socket.on("joinProject", (user)=>{
    console.log(user);
    io.emit("joinProject",user);
  })


  // Listens to the current program that the
  // user is about to edit
  socket.on('currentProgram', (program)=>{
    console.log('Program you are editing: ' + program);
  });

  // Listens to any users that starts making changes
  // on a program for a project
  socket.on('editProgram', (program)=>{
    console.log("changes have been made");
    io.emit('editProgram',program);
  });

  // Listens to any users that compiles a program
  socket.on('compiling', (user)=>{
    console.log(user + " is compiling program");
    io.emit("compiling", user);
  });

  // Listens to all code that compiles
  socket.on('compiledCode', (output)=>{
    console.log("Output is: " + output);
    io.emit('compiledCode', output);
  });
});

/**
 * Starting another server that is hosted on
 * localhost:4444 for the sockets to work
 */
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
