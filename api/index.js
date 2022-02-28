const db = require('./Utils/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const express = require('express');
const app = express();
const port = 3001;
const withAuth = require('./Utils/middleware');
const authRoutes = require('./Routes/authRoutes');

//Database connection
db.init();

//Utilities
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.options('*', cors({
    origin: "http://localhost:3000",
    credentials: true
}));

//Routing
authRoutes(app);

app.get('/api/home', function(req, res) {
    res.send('Welcome!');
  });

app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
});

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`)
});