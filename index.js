'use strict';

// npm modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const passport = require('passport');
const app = express();
const cors = require('cors');
//const LocalStrategy = require('passport-local').Strategy;


// app modules
// const clientRoutes = require('./route/client-route.js');
// const trainerRoutes = require('./route/trainer-route.js');
const errorMiddleWare = require('./lib/error.js');


// module constants
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/videofit';

//Mongo config/start-up
mongoose.createConnection(MONGODB_URI);
mongoose.Promise = Promise;

// passport config - specifcially for local authentication through mongoose
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Mount routes and middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('express-session')({
//   secret: process.env.VID_FIT_SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(morgan('dev'));
app.use(cors());
app.use(errorMiddleWare);
//app.use(clientRoutes);
//app.use(trainerRoutes);


app.listen(PORT, function() {
  console.log('Listening on port: ', PORT);
});
