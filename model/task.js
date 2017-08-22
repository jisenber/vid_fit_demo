'use strict';

const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  date: {type: String}, //would do type Date but will say String for simplicity at the moment
  description: {type: String},
  assignedBy: {type: String, ref: 'trainers'},
  assignedTo: {type: String, ref: 'clients'},
  completed: {type: Boolean, default: false}
  //after task has been completed, it should be deleted or hidden
});


module.exports = mongoose.model('tasks', taskSchema);
