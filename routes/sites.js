const express = require('express');
const router = express.Router();
const Site = require('../models/site');
const Volunteer = require('../models/volunteer');

router.get('/', function(req, res, next) {
    const sites = Site.all; 
    res.render('sites/index', { title: 'VolunteerCenter || Sites', sites: sites });
});

router.get('/form', async (req, res, next) => {
  const site = Site.all;
  res.render('sites/form', { 
    title: 'VolunteerCenter || Sites', 
    site: site, 
    volunteers: Volunteer.all });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Site.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the site has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/sites')
});

router.get('/edit', async (req, res, next) => {
  let siteId = req.query.id;
  let site = Site.get(siteId);
  res.render('sites/form', { 
    title: 'VolunteerCenter || Sites', 
    site: site, 
    siteId: siteId, 
    volunteers: Volunteer.all });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'VolunteerCenter || Sites',
    site: Site.get(req.params.id),
    volunteers: Volunteer.all
  }
if (templateVars.site.volunteerIds) {
    templateVars.volunteers = templateVars.site.volunteerIds.map((volunteerId) => Volunteer.get(volunteerId));
  }
  res.render('sites/show', templateVars);
});

module.exports = router;