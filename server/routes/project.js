/**
 * Libraries needed for this route
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const randomKey = require('random-key');
const Project = require('../models/Project');
const User = require("../models/User");
const Program = require("../models/Program");

/**
 * Creates a new project and stores it inside
 * the database
 */
router.post('/createProject', (req,res,next)=>{
  // Generate a unique code for every new project
  const code = randomKey.generate();

  // Send an error if thhere is no random generated code
  if(!code) {
    res.status(500).send('Error in creating new project');
  }

  // Create a new project and store all of the necessary fields
  const project = new Project({
    owner: req.body.user,
    name: req.body.name,
    desc: req.body.description,
    urlKey: code,
    editors: [],
    maxUsers: 5,
    language: req.body.language,
  });

  // Save the project into the database
  project.save().then(result =>{
    // Execute this code if the project has been saved
    console.log("Project is stored in the database");
    res.status(200).send(result);
  }).catch(err=>{
    // Catch the error if something went wrong in storing the project
    console.log('Invalid data has been put. Project cannot be created');
    res.status(500).send('Error has occured');
  });

});

/**
 * Gets a project from the database
 * (Used when users want to access their projects)
 */
router.get('/getProject', (req,res,next)=>{

});

/**
 * Adds programs to their projects
 */
router.post('/addProgram', (req,res,next)=>{

  // Creates a new program with all of the required fields
  const newProgram = new Program({
    projectId: req.body.projectId,
    name: req.body.name,
    code: req.body.code
  });

  newProgram.save().then((results)=>{
    console.log('Program added to project');
    res.send(results);
  }).catch((err)=>{
    console.log('There has been an error in storing the program');
    console.log(err);
    res.send(err);
  });
});

/**
 * Gets all the available programs from the
 * database
 */
router.get('/getPrograms', (req,res,next)=>{

});

module.exports = router;
