'use strict';

var mongoose = require('mongoose');

var trainerSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String},
  email: {type: String, unique: true},
  clients: [{type: String, ref: 'clients'}],
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'tasks'}]
});




module.exports = mongoose.model('trainers', trainerSchema);
