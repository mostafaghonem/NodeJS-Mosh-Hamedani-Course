const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'My Express App',
    message: 'Hello from template engine pug',
  });
});

module.exports = router;
