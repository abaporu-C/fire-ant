require("dotenv").config()
const {SECRET} = process.env;
const jwt = require('jsonwebtoken');

//Checks authenticity of jwt
const withAuth = function(req, res, next) {
  const token = req.cookies.token;    
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, SECRET, function(err, decoded) {      
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;