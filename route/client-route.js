// npm modules
const createError = require('http-errors');
const Router = require('express').Router;

//Bring in the model instances
const Client = require('../model/client.js');
const Trainer = require('../model/trainer.js');
const Task = require('../model/task.js');

//router instance for actions taken by the client
const router = module.exports = new Router()


//sign up route (POST)
router.post('/client/signup', (req, res, next) => {
  let client = new Client(req.body);

  client.hashPassword(client.password) //using model method to hash passowrd
  .then(user => user.save()) //save client instance in DB
  .then(user => {
    let secureUserBody = user.toObject(); //transform to regular javascript object allows for the delete operation below
    delete secureUserBody['password'];
    res.json(secureUserBody);
  })
  .catch(next);
});


//add a trainer route (POST)
router.post('/client/:trainerUsername', (req, res, next) => {
  Trainer.findOne({username: req.params.trainerUsername})
  .then(newTrainer => {
    Client.findOneAndUpdate({username: req.body.username}, {$set:{trainer:newTrainer.username}}, {new: true}, function(err, updatedClient) {
      if(err) {
        console.log(err); //TODO: change this
        return;
      }
      let secureUpdatedClient = updatedClient.toObject();
      delete secureUpdatedClient['password'];
      res.json(secureUpdatedClient);
    });
  })
  .catch(next);
});

//View Trainers
router.get('/trainers/:username*?', (req, res, next) => {
  if(!req.params.username) {
    Trainer.find({})
    .then(trainers => {
      let trainerList = trainers.map(function(ele) {
        return {username: ele.username, email: ele.email};
      });
      res.json(trainerList);
    })
    .catch(next);
  } else {
    Trainer.findOne({username: req.params.username})
    .then( selectedTrainer => {
      res.json({username: selectedTrainer.username, email: selectedTrainer.email});
    })
  .catch(next);
  }
});

//view tasks (GET)


//change task to completed (PUT)

//unsubscribe route (DELETE)
