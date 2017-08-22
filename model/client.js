'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

var clientSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String},
  email: {type: String, unique: true},
  trainer: {type: String, ref: 'trainers'},
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'tasks'}]
});

clientSchema.methods.hashPassword = function(password) {
  if(!password) return Promise.reject(createError(400));

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

module.exports = mongoose.model('clients', clientSchema);
