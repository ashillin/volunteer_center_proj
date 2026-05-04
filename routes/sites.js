const express = require('express');
const router = express.Router();
const Site = require('../models/site');

router.get('/', function(req, res, next) {
    const sites = Site.all; 
    res.render('sites/index', { title: 'VolunteerCenter || Sites', sites: sites });
});

router.get('/form', async (req, res, next) => {
  res.render('sites/form', { title: 'VolunteerCenter || Sites', site: site });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Site.upsert(req.body);
  res.redirect(303, '/sites')
});

router.get('/edit', async (req, res, next) => {
  let siteIndex = req.query.id;
  let site = Site.get(siteIndex);
  res.render('sites/form', { title: 'VolunteerCenter || Sites', site: site, siteIndex: siteIndex  });
});

module.exports = router;