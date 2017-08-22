'use strict';

// npm modules
const request = require('superagent');
const expect = require('chai').expect;

// app modules
const app = require('../index.js');
const Client = require('../model/client.js');
const Trainer = require('../model/trainer.js');
const Task = require('../model/task.js');

// module constants
const PORT = process.env.PORT || 3000;

//dummy data for testing
let signUpClient = {
  username: 'Bert',
  password: 'test1234',
  email: 'bert@test.com'
};

let exampleClient = {
  username: 'Jacob',
  password: 'test1234',
  email: 'jacob@test.com'
};

let exampleTrainer = {
  username: 'Josh',
  password: 'test1234',
  email: 'josh@videofit.com'
};

let exampleTask = {
  date: new Date('2017-08-23'),
  description: 'run a marathon',
  assignedBy: 'Josh',
  assignedTo: 'Jacob',
  completed: false
};

describe('testing client routes', function() {
  let server;
  before(done => {

    server = app.listen(PORT, () => console.log('started server from student tests'));

    new Client(exampleClient).save()
    .then(() => {
      new Trainer(exampleTrainer).save();
    })
    .then(() => {
      new Task(exampleTask).save();
    })
    .catch(done);
  });
  describe('the signup route', () => {
    it('should sign-up a new client in the database', done => {
      request.post('http://localhost:3000/signup')
      .send(signUpClient)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('string');
        done();
      });
    });

    after(done => {
      Client.remove({})
      .then(() => Trainer.remove({}))
      .then(() => Task.remove({}))
      .then(() => {
        server.close(() => console.log('server closed after student tests'));
        done();
      })
      .catch(done);
    });
  });
});
