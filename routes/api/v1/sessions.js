var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');

// Checklist:
// Check if email is in User database.
// Load hash from your password DB.
// Does password match?
// If all above check off, return api key.

/* POST a new Session (User Login) */
router.post('/', function(req, res, next) {
  User.findOne({
    where: {
      email: req.body.email,
    }
  })
  .then(user => {
    bcrypt.compare(req.body.password, user.password).then(result =>{
      if(result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({ api_key: user.apiKey}))
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(401).send(JSON.stringify({ error: 'Invalid login.' }))
      }
    })
  })
  .catch(() => {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).send(JSON.stringify({ error: 'Invalid login.' }))
  })
})

module.exports = router;
