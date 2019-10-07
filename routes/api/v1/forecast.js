var express = require('express');
var router = express.Router();
var User = require('../../../models').User;

var fetch = require('node-fetch');
var forecastSerializer = require('../../../serializers/forecast.serializer.js')

/* GET forecast for a specific city */
router.get('/', function(req, res, next) {
  User.findOne({
    where: {
      api_key: req.body.akiKey
    }
  })
  .then(user => {
    if (user) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_GEO_API}`)
        .then(res => {
          res.json();
        })
        .then(data => {
          let latitude = data.results[0].geometry.location.lat;
          let longitude = data.results[0].geometry.location.lng;
          fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${latitude},${longitude}`)
        })
        .then(res => {
          res.json();
        })
        .then(data => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify({ data: new forecastSerializer(req.query.location, data) }))
        })
        .catch(() => {
          res.setHeader('Content-Type', 'application/json');
          res.status(401).send(JSON.stringify({ error: 'Unauthorized' }))
        })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(JSON.stringify({ error: 'Error' }))
    }
  })
})
