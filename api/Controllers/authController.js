require('dotenv').config();
const {SECRET} = process.env
const codeGenerator = require('../Utils/GeneralPurposeFunctions/codeGenerator');
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const sendConfirmationMail = require('../Utils/mailsender');


//Registration  
async function register(req, res){
        const { username, email, password } = req.body;

        const user = new User({
          username: username,
          email: email,
          password: password,
          confirmationCode: codeGenerator()});

        user.save({validateBeforeSave: true}, function(err){
            if(err){
                console.error(err)
                res.status(500).send("Error registering user. Please, try again.");
            } else {
                console.log(`User created.`)
                res.status(200).send("User was registered succesfully! Please check your email!");
                sendConfirmationMail(user.username, user.email, user.confirmationCode)
            }
        });
}

//Authentication
async function authenticate(req, res){
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
            error: 'Username is incorrect or doesn\'t exist'
          });
      } else if(user.status === "Pending"){
        res.status(401).json({error: 'Please, Confirm your email'})
      } 
      else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Password is incorrect'
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

//User Verification
 async function verifyUser(req, res, next = null){
   
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
  .then(user => {    
    if(!user) return res.status(404).send({message: "User Not Found."})

    user.status = "Active";
    user.save((err) => {
      if(err){
        console.log(err)
        res.status(500).send({message: "err"})
        return;
      }
    })
  })
  .catch(err => console.error("error", err))
}

module.exports = {
  register,
  authenticate,
  verifyUser
}