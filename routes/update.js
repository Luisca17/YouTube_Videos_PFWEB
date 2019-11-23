var express = require('express');
var router = express.Router();

/* GET videos listing. */
router.get('/', function (req, res, next) {
    res.render('update', { title: 'YouTube Videos' });
  });

module.exports = router;