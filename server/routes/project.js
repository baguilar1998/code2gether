/**
 * Libraries needed for this route
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const randomKey = require('random-key');
const Project = require('../models/Project');
const User = require("../models/User");


router.post('/createProject', (req,res,next)=>{
  // Generate a unique code for every new project
  const code = randomKey.generate();

  // Send an error if thhere is no random generated code
  if(!code) {
    res.status(500).send('Error in creating new project');
  }

  const project = new Project({
    owner: req.body.user,
    name: req.body.name,
    desc: req.body.description,
    urlKey: code,
    editors: [],
    maxUsers: 5,
    language: req.body.language,
  });

  project.save().then(result =>{
    console.log("Project is stored in the database");
    res.status(200).send(result);
  }).catch(err=>{
    console.log('Invalid data has been put. Project cannot be created');
    res.status(500).send('Error has occured');
  });

});

router.get('/getProject', (req,res,next)=>{

});

module.exports = router;
