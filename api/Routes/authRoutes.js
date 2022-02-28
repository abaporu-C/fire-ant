const { register, authenticate, verifyUser } = require("../Controllers/authController");
const withAuth = require('../Utils/middleware');

module.exports = function(app){
    //Get confirmation status
    app.post('/api/auth/confirm/:confirmationCode', function(req, res){        
        verifyUser(req, res)
    })

    // POST route to register a user
    app.post('/api/auth/register', register);

    //authenticate
    app.post('/api/auth/authenticate', authenticate);

    //Check JWT tokens
    app.get('/checkToken', withAuth, function(req, res) {        
        res.sendStatus(200);
    });
};