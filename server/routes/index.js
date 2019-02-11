var express = require('express')
var router = express.Router()
var database = require('../services/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Feed', items: db.items})
})


module.exports = router;
