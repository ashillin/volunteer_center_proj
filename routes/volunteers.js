const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');

router.get('/', function(req, res, next) {
  const volunteers = Volunteer.all;
  res.render('volunteers/index', { title: 'VoluneerCenter || Volunteers', volunteers: volunteers });
});

router.get('/form', async (req, res, next) => {
  res.render('volunteers/form', { title: 'VoluneerCenter || Volunteers' });
});

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Volunteer.add(req.body);
  res.redirect(303, '/volunteers')
});


module.exports = router;