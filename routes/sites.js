const express = require('express');
const router = express.Router();
const Site = require('../models/site');
const Volunteer = require('../models/volunteer');

router.get('/', function(req, res, next) {
    const sites = Site.all; 
    res.render('sites/index', { title: 'VolunteerCenter || Sites', sites: sites });
});

router.get('/form', async (req, res, next) => {
  res.render('sites/form', { title: 'VolunteerCenter || Sites', site: site, volunteers: Volunteer.all });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Site.upsert(req.body);
  res.redirect(303, '/sites')
});

router.get('/edit', async (req, res, next) => {
  let siteIndex = req.query.id;
  let site = Site.get(siteIndex);
  res.render('sites/form', { title: 'VolunteerCenter || Sites', site: site, siteIndex: siteIndex, volunteers: Volunteer.all  });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'VolunteerCenter || Sites',
    site: Site.get(req.params.id)
  }
if (templateVars.site.volunteerIndex) {
    templateVars.volunteers = templateVars.site.volunteerIndex.map((volunteerIndex) => Volunteer.get(volunteerIndex));
  }
  res.render('sites/show', templateVars);
});

module.exports = router;