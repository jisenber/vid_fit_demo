'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');

var taskSchema = mongoose.Schema({
  date: {type: Date},
  description: {type: String},
  assignedBy: [{type: String, ref: 'trainers'}],
  assignedTo: [{type: String, ref: 'clients'}],
  completed: {type: Boolean, default: false}
  //after task has been completed, it should be deleted or hidden
});


module.exports = mongoose.model('tasks', taskSchema);
