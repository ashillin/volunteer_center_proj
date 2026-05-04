const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');

router.get('/', function(req, res, next) {
  const volunteers = Volunteer.all;
  res.render('volunteers/index', { title: 'VolunteerCenter || Volunteers', volunteers: volunteers });
});

router.get('/form', async (req, res, next) => {
  res.render('volunteers/form', { title: 'VolunteerCenter || Volunteers', volunteer: volunteer});
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Volunteer.upsert(req.body);
  res.redirect(303, "/volunteers")
});

router.get('/edit', async (req, res, next) => {
  let volunteerIndex = req.query.id;
  let volunteer = Volunteer.get(volunteerIndex);
  res.render('volunteers/form', { title: 'VolunteerCenter || Volunteers', volunteer: volunteer, volunteerIndex: volunteerIndex  });
});


module.exports = router;