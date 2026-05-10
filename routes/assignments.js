const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');
const Site = require('../models/site');
const Role = require('../models/role');

router.get('/form', async (req, res, next) => {
    if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
  res.render('assignments/form', {
    title: 'VolunteerCenter || Register',
    sites: await Site.all(),
    roles: await Role.all(),
    selectedSiteId: req.query.siteId  // pre-selects the site they came from
  });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  let siteId = req.body.siteId;
  let redirect = `/sites/show/${siteId}`;
  Assignment.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your role has been stored',
  };
  res.redirect(303, redirect)
});

module.exports = router;
