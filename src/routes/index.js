var express = require('express');
var router = express.Router();

var homepage = require('./homepage');
var list = require('./list');

router.use(homepage);
router.use(list);

module.exports = router;