var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var uuidv1 = require('uuid/v1');
var bcrypt = require('bcrypt');
var saltRounds = 10;

/* Create a new User */
router.post('/', function(req, res, next) {
  if(req.body.password === req.body.passwordConfirmation) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      User.create({
        email: req.body.email,
        password: hash,
        apiKey: uuidv1()
      })
      .then(user => {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(JSON.stringify({ api_key: user.apiKey }))
      })
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({ error: 'Password and password confirmation mis-match.' }));
  }
})

module.exports = router;
