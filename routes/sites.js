const express = require('express');
const router = express.Router();
const Site = require('../models/site');
const Volunteer = require('../models/volunteer');
const Assignment = require('../models/assignment');
const Role = require('../models/role');
const Notice = require('../models/notice');

router.get('/', async (req, res, next) =>{
    const sites = await Site.all();
    res.render('sites/index', { title: 'VolunteerCenter || Sites', sites: sites });
});

router.get('/form', async (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
  res.render('sites/form', { 
    title: 'VolunteerCenter || Sites', 
    site: await Site.all(), 
    volunteers: await Volunteer.all(),
    roles: await Role.all()  // ✅ add this
  });
});


router.post('/upsert', async (req, res, next) => {
    if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
  req.body.volunteerId = req.session.currentUser.volunteerId;
  console.log('body: ' + JSON.stringify(req.body));
  await Site.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the site has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/sites')
});


router.get('/edit', async (req, res, next) => {
    if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
  let siteId = req.query.id;
  let site = await Site.get(siteId);
  if (site.volunteerId != req.session.currentUser.volunteerId) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'You are not authorized to edit this site!',
    };
    res.rediirect(303, 'sites/show/${siteId}');
    return;
  }
  site.volunteerIds = (await Volunteer.allForSite(site)).map(volunteer => volunteer.id);
  res.render('sites/form', { 
    title: 'VolunteerCenter || Sites', 
    site: site, 
    siteId: siteId, 
    volunteers: await Volunteer.all(),
    roles: await Role.all()  // ✅ add this 
  });
});

router.get('/show/:id', async (req, res, next) => {
  let site = await Site.get(req.params.id);
  let templateVars = {
    title: 'VolunteerCenter || Sites',
    site: site,
    volunteers: await Volunteer.allForSite(site),
    siteId: req.params.id,
    roles: await Role.all(),
    notices: await Notice.allForSite(site)
  };
  templateVars.site.volunteers = await Volunteer.allForSite(templateVars.site);
  if (req.session.currentUser) {
    templateVars['assignment'] = await Assignment.get(
      req.session.currentUser.volunteerId,
      req.params.id);
  }
  res.render('sites/show', templateVars);
});

module.exports = router;