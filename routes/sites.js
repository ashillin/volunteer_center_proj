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
  const site = await Site.all();
  res.render('sites/form', { 
    title: 'VolunteerCenter || Sites', 
    site: await Site.all(), 
    volunteers: await Volunteer.all()});
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Site.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the site has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/sites')
});

// router.get('/edit', async (req, res, next) => {
//   let templateVars = await { title: 'VolunteerCenter || Sites', volunteers: await Volunteer.all() }
//   if (req.query.id) {
//     let site = await Site.get(req.query.id)
//     if (site) {templateVars['site'] = site}
//   }
//   res.render('sites/form', templateVars);
// });


router.get('/edit', async (req, res, next) => {
  let siteId = req.query.id;
  let site = await Site.get(siteId);
  site.volunteerIds = (await Volunteer.allForSite(site)).map(volunteer => volunteer.id);
  res.render('sites/form', { 
    title: 'VolunteerCenter || Sites', 
    site: site, 
    siteId: siteId, 
    volunteers: await Volunteer.all() });
});

router.get('/show/:id', async (req, res, next) => {
  let site = await Site.get(req.params.id);
  let templateVars = {
    title: 'VolunteerCenter || Sites',
    site: site,
    volunteers: [],
    siteId: req.params.id,
    roles: await Role.all(),
    notices: await Notice.allForSite(site)
  };
  templateVars.site.volunteers = await Volunteer.allForSite(templateVars.site);
  console.log('volunteers at site:', templateVars.site.volunteers);
  if (req.session.currentUser) {
    templateVars['assignment'] = await Assignment.get(
      req.session.currentUser.volunteerId,
      req.params.id);
  }
  res.render('sites/show', templateVars);
});

module.exports = router;