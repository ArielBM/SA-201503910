var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Aqui no hay nada :v ve a /products");
});

module.exports = router;
