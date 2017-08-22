// npm modules
//const createError = require('http-errors');
const Router = require('express').Router;


//app modules
const Trainer = require('../model/trainer.js');

const router = module.exports = new Router();

//sign up route (POST)
router.post('/trainer/signup', (req, res, next) => {
  let trainer = new Trainer(req.body);

  trainer.hashPassword(trainer.password) //using model method to hash passowrd
  .then(trainer => trainer.save()) //save trainer instance in DB
  .then(trainer=> {
    let secureUserBody = trainer.toObject(); //transform to regular javascript object allows for the delete operation below
    delete secureUserBody['password'];
    res.json(secureUserBody);
  })
  .catch(next);
});


//add a client route (POST)

//View your own clients (GET)

//Give a client a task (POST)


//unsubscribe route (DELETE)
