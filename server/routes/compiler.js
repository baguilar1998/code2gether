const express = require('express');
const router = express.Router();
const compiler = require('compile-run');

/**
 * SAMPLE RESULTS
 * { stderr: '',
  stdout: 'Hello World\r\n',
  exitCode: 0,
  memoryUsage: 393216,
  cpuUsage: 47000 }
 */

/**
 * Route to compile python code
 */
router.post('/python', (req,res,next)=>{
  const sourcecode = req.body.code+ ` `;
  let codeResults = compiler.python.runSource(sourcecode);
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
  const sourcecode = req.body.code;
  let codeResults = compiler.cpp.runSource(sourcecode);
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
  const sourcecode = req.body.code ;
  let codeResults = compiler.cpp.runSource(sourcecode);
  codeResults.then(result=>{
    console.log(result);
    res.send(result);
  }).catch(err=>{
    console.log(err);
  });
});

/**
 * Route to compile java code
 */
router.post('/java', (req,res,next)=>{
  const sourcecode = req.body.code ;
  let codeResults = compiler.java.runSource(sourcecode);
  codeResults.then(result=>{
    // console.log(result);
    res.send(result);
  }).catch(err=>{
    res.status(401).send(err);
    console.log(err);
  });
});

/**
 * Route to compile javascript code
 * in node env
 */
router.post('/javascript', (req,res,next)=>{
  const sourcecode = req.body.code ;
  let codeResults = compiler.node.runSource(sourcecode);
  codeResults.then(result=>{
    console.log(result);
    res.send(result);
  }).catch(err=>{
    console.log(err);
  });
});
module.exports = router;
