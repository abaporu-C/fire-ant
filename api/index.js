import { register, authenticate } from "./Controllers/authController";

const db = require('./Utils/mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3001;
const User = require('./Models/User');
const withAuth = require('./Utils/middleware');

//Database connection
db.init();

//Utilities
app.use(cookieParser());
app.use(bodyParser.json());

//Routing
app.get('/api/home', function(req, res) {
    res.send('Welcome!');
  });

app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });

// POST route to register a user
app.post('/api/register', async function(req, res) {    
    register(req, res);
  }
);

//authenticate
app.post('/api/authenticate', function(req, res) {    
    authenticate(req, res);
  });

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`)
});