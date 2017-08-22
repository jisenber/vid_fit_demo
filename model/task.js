'use strict';

var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  Date: {type: String},
  email: {type: String, unique: true},
  description: {type: String},
  assignedBy: [{type: String, ref: 'trainers'}],
  assignedTo: [{type: String, ref: 'clients'}],
  completed: {type: Boolean, default: false}
  //after task has been completed, it should be deleted or hidden
});


module.exports = mongoose.model('tasks', taskSchema);
