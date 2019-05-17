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
 * Allows other users to join projects
 */
router.post('/joinProject', (req,res,next)=>{
  // Gets the invitation code that the user inputted
  const invitationInput = req.body.code;
  // Find the project that has the invitation code
  Project.findOne({"urlKey": invitationInput}).then(project=>{
    // If there was no project retrieve, display an error
    if(!project){
      console.log("project was not found");
    } else {
      // Check to see if the user is trying to join their own project
      const userId = req.body.userId;
      if(project.owner === userId){
        console.log("owner cannot join their own room");
      } else {
        // Send the project data so the user can join
        res.status(200).send(project);
      }
    }
  })

});

/**
 * Pushes the user to the project so
 * they become an editor now
 */
router.post('/pushToProject', (req,res,next)=>{
  // Get the user data that was sent in
  const user = req.body.user;
  //Get the projectId that was sent in
  const project = req.body.projectId;
  //Update the project and add the user to the editors array
  // because they will be now contributing to the project
  Project.updateOne({'_id':project}, {$push:{editors:user}} , {safe:true, multi:true} )
  .then(project=>{
    res.status(200).send(project);
  }).catch(err=>{
    console.log("There was an error in joining the project");
    console.log(err);
  })

});

/**
 * Gets all of the current projects that the user
 * is working on
 */
router.post('/getProjects', (req,res,next)=>{
  // Get the user id
  const userId = req.body.userId;
  let projects;
  // Queries all the projects that the user created
  Project.find({"owner":userId}).then(userprojects =>{
    projects = userprojects;
    // Send all projects to the user
    res.status(200).send(projects);
  });
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

  // Add the program data to the database
  newProgram.save().then((results)=>{
    // Send the program to the user
    console.log('Program added to project');
    res.send(results);
  }).catch((err)=>{
    // Cataches any errors if something went wrong in adding a program
    // to the database
    console.log('There has been an error in storing the program');
    console.log(err);
    res.send(err);
  });
});

/**
 * Gets all the available programs from the
 * database
 */
router.post('/getPrograms', (req,res,next)=>{
  // Grab the projectId
  const projectId = req.body.projectId;
  let programList;
  // Get all programs that contain the projectId
  // and send them to the user
  Program.find({"projectId": projectId}).then(programs =>{
    programList = programs;
    res.status(200).send(programList);
  })
});

module.exports = router;
