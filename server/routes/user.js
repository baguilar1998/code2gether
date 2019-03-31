/**
 * Libraries needed for this route
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

router.post('/signup', (req,res,next)=>{

  /**
   * Hashes the user password because you
   * dont want to store the actual password
   * in the database
   */
  bcrypt.hash(req.body.password, 10).then(hash=>{

    // Create the User Model
    const user = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    });

    /**
     * Save the user into the database
     * @result the user has been saved
     * @err an error occured in saving the user info in the db
     */
    user.save().then(result => {
      res.status(201).send(result);
    }).catch(err=>{
      console.log('An error has occured while putting the user in the db');
      res.status(500).send(err);
    })
  });

});

router.post('/login', (req,res,next)=>{
  let user;
  /**
   * Finds the user based off the user name
   */
  User.findOne({username: req.body.username})
  .then(foundUser => {

    /**
     * Checks if the user exists
     */
    if(!foundUser) {
      return res.status(401).json({message:'User not found'});
    }
    // Store the user information in a variable
    user = foundUser;
    // Compare hash values of the password
    return bcrypt.compare(req.body.password, foundUser.password);
  }).then(result =>{
    /**
     * If the entered password hash value does not
     * match the user password hash value, do not
     * allow them in the website
     */
    if(!result) {
      return res.status(401).json({message: "Failed to log in"});
    }

    // Return the user information
    res.status(200).send(user);
  })

});

module.exports = router;
