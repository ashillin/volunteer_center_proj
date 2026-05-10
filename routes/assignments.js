const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');

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
