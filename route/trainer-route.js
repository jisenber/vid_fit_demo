// npm modules
const createError = require('http-errors');
const Router = require('express').Router;


//app modules
const Trainer = require('../model/trainer.js');
const Client = require('../model/client.js');
const Task = require('../model/task.js')

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
//curl -X POST -H 'Content-Type: application/json' -d '{"username":"mctest", "password":"test1234", "email":"mctest@test.com"}' http://localhost:3000/trainer/signup


//add a client (POST)
router.post('/trainer/addclient/:clientUsername', (req, res, next) => {
  Client.findOne({username: req.params.clientUsername})
  .then(client => {
    Trainer.findOneAndUpdate({username: req.body.username}, {$push:{clients: client.username}}, {new: true}, (err, trainer) => {
      if(err) {
        console.log(err);
        return(next(createError(400)));
      }
      res.json({username: trainer.username, clients: trainer.clients});
    });
  })
  .catch(err => {
    console.log(err);
    res.status(404).end('client not found');
  });
});
//curl -X POST -H 'Content-Type: application/json' -d '{"username":"mctest"}' http://localhost:3000/addclient/bert


//View your own clients (GET)
router.get('/trainer/clients', (req, res, next) => {
  Trainer.findOne({username:req.query.trainer})
  .then(trainer => {
    res.json(trainer.clients);
  })
  .catch(err => {
    console.log(err);
    res.status(404).end('trainer not found');
  });
});
//curl localhost:3000/trainer/clients/?trainer=mctest


//Give a client a task (POST)
router.post('/trainer/addtask', (req, res, next) => {
  new Task(req.body).save()
  .then(task => {
    Client.findOneAndUpdate({username: req.query.client}, {$push:{tasks: task}}, {new: true}, (err, updatedClient) => {
      if(err) {
        console.log(err);
        return(next(createError(400, 'bad request')));
      }
      res.json(updatedClient.tasks);
    });
  });
});

//curl -X POST -H 'Content-Type:application/json' -d '{"date":"08-23-2017", "description":"run a marathon", "assignedBy":"mctest", "assignedTo":"steve"}' http://localhost:3000/trainer/addtask/?client=steve


//unsubscribe route (DELETE)
