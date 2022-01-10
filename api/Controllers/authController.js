require('dotenv').config();
const {SECRET} = process.env
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");


//Registration  
export async function register(req, res){
        const { username, email, password } = req.body;
        const user = new User({username:"mathew", email, password, confirmationCode: "Yep"});

        user.save({validateBeforeSave: true}, function(err){
            if(err){
                console.error(err)
                res.status(500).send("Error registering user. Please, try again.");
            } else {
                console.log(`User created.`)
                res.status(200).send("Welcome to the club!");
            }
        });
}

//Authentication
export async function authenticate(req, res){
    const { email, password } = req.body;        

    User.findOne({ email: email }, function(err, user) {      
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, SECRET, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
}