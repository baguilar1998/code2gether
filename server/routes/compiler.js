// Package imports
const express = require('express');
const router = express.Router();
// Node package that allows us to compile programs
const compiler = require('compile-run');


/**
 * Route to compile python code
 */
router.post('/python', (req,res,next)=>{
  // Get the python code
  const sourcecode = req.body.code+ ` `;
  // Perform the async function to compile python code
  let codeResults = compiler.python.runSource(sourcecode);
  // When the async task is finish, get the result or catch the error
  codeResults.then(result=>{
    console.log(result);
    res.send(result);
  }).catch(err=>{
    console.log(err);
  });
});

/**
 * Route to compile c++ code
 */
router.post('/cplusplus', (req,res,next)=>{
  // Get the C++ code
  const sourcecode = req.body.code;
  // Perform the async function to compile C++ code
  let codeResults = compiler.cpp.runSource(sourcecode);
  // When the async task is finish, get the result or catch the error
  codeResults.then(result=>{
    console.log(result);
    res.send(result);
  }).catch(err=>{
    console.log(err);
  });
});

/**
 * Route to compile c code
 */
router.post('/c', (req,res,next)=>{
  // Get the C code
  const sourcecode = req.body.code ;
  // Perform the async function to compile C code
  let codeResults = compiler.cpp.runSource(sourcecode);
  // When the async task is finish, get the result or catch the error
  codeResults.then(result=>{
    res.send(result);
  }).catch(err=>{
    res.status(401).send(err);
  });
});

/**
 * Route to compile java code
 */
router.post('/java', (req,res,next)=>{
  // Get the Java code
  const sourcecode = req.body.code ;
  // Perform the async function to compile Java code
  let codeResults = compiler.java.runSource(sourcecode);
  // When the async task is finish, get the result or catch the error
  codeResults.then(result=>{
    res.send(result);
  }).catch(err=>{
    res.status(401).send(err);
  });
});

/**
 * Route to compile javascript code
 * in node env
 */
router.post('/javascript', (req,res,next)=>{
  // Get the Javascript code
  const sourcecode = req.body.code;
  // Perform the async function to get the javascript code
  let codeResults = compiler.node.runSource(sourcecode);
  // When the async task is finish, get the result or catch the error
  codeResults.then(result=>{
    console.log(result);
    res.send(result);
  }).catch(err=>{
    console.log(err);
  });
});
module.exports = router;
