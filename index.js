'use strict';

// npm modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


//app modules
const clientRoutes = require('./route/client-route.js');
const trainerRoutes = require('./route/trainer-route.js');
const errorMiddleWare = require('./lib/error.js');


// module constants
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/videofit';

//Mongo config/start-up
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

//Mount routes and middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(errorMiddleWare);
app.use(clientRoutes);
app.use(trainerRoutes);


app.listen(PORT, function() {
  console.log('Listening on port: ', PORT);
});
