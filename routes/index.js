const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  return res.render('main');
});

module.exports = router;
