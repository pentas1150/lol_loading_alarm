const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  return res.render('main', { ip: process.env.IP, port: process.env.PORT });
});

module.exports = router;
