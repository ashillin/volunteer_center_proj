const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');

router.get('/', async (req, res, next) => {
  const volunteers = await Volunteer.all();
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
 await Volunteer.upsert(req.body);
 req.session.flash = {
   type: 'info',
   intro: 'Success!',
   message: 'the volunteer has been created!',
 };
 res.redirect(303, '/volunteers')
});


router.get('/edit', async (req, res, next) => {
  let templateVars = { title: 'VolunteerCenter || Volunteers' }
  if (req.query.id) {
    let volunteer = await Volunteer.get(req.query.id)
    if (volunteer) {templateVars['volunteer'] = volunteer}
  }
  res.render('volunteers/form', templateVars);
});

router.get('/show/:id', async (req, res, next) => {
  let volunteer = await Volunteer.get(req.params.id);
  let templateVars = {
    title: 'VolunteerCenter || Volunteer',
    volunteer: volunteer,
    sites: await Volunteer.allForVolunteer(volunteer),
    isCurrentVolunteer: req.session.currentUser && req.session.currentUser.volunteerId == req.params.id
  };
  res.render('volunteers/show', templateVars);
});


module.exports = router;