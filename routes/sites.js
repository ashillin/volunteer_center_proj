const express = require('express');
const router = express.Router();
const Site = require('../models/site');
const Volunteer = require('../models/volunteer');
const Assignment = require('../models/assignment')

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
  let site = Site.get(siteId);
  site.volunteerIds = (await Volunteer.allForSite(site)).map(volunteer => volunteer.id);
  res.render('sites/form', { 
    title: 'VolunteerCenter || Sites', 
    site: site, 
    siteId: siteId, 
    volunteers: await Volunteer.all() });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'VolunteerCenter || Sites',
    site: await Site.get(req.params.id),
    volunteers: [],
    siteId: req.params.id,
    titles: Assignment.titles
  };
  templateVars.site.volunteers = await Volunteer.allForSite(templateVars.site);
  if (templateVars.site.roleId) {
    templateVars['role'] = await Role.get(templateVars.site.roleId);
  }
  if (req.session.currentUser) {
    templateVars['assignment'] = await Assignment.get(req.params.id, req.session.currentUser.email);
  }
  res.render('sites/show', templateVars);
});

module.exports = router;