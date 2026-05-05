const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');

router.get('/', function(req, res, next) {
  const volunteers = Volunteer.all;
  res.render('volunteers/index', { title: 'VolunteerCenter || Volunteers', volunteers: volunteers });
});

router.get('/form', async (req, res, next) => {
  res.render('volunteers/form', { 
    title: 'VolunteerCenter || Volunteers', 
    // volunteer: volunteer
    });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Volunteer.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the volunteer has been ${createdOrupdated}!`,
  };
  res.redirect(303, "/volunteers")
});

router.get('/edit', async (req, res, next) => {
  let volunteerIdx = req.query.id;
  let volunteer = Volunteer.get(volunteerIdx);
  res.render('volunteers/form', { title: 'VolunteerCenter || Volunteers', volunteer: volunteer, volunteerIdx: volunteerIdx  });
});


module.exports = router;