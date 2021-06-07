var express = require('express');
var router = express.Router();
let rawdata = require('./data.json');

/* GET holdings listing. */
router.get('/', function(req, res, next) {
  res.send(rawdata);
});

module.exports = router;