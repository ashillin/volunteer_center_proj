const express = require('express');
const router = express.Router();
const Site = require('../models/site');

router.get('/', function(req, res, next) {
    const sites = Site.all; 
    res.render('sites/index', { title: 'VoluneerCenter || Sites', sites: sites });
});

router.get('/form', async (req, res, next) => {
  res.render('sites/form', { title: 'VoluneerCenter || Sites' });
});

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Site.add(req.body);
  res.redirect(303, '/sites')
});

module.exports = router;