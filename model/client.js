'use strict';

var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String},
  email: {type: String, unique: true},
  trainer: {type: String, ref: 'trainers'},
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'tasks'}]
});




module.exports = mongoose.model('clients', clientSchema);
