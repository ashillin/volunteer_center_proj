const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const sites = [
    "Valentine Ave", "3rd Ave", "Fordham Road"
  ]
  res.render('sites/index', { title: 'VoluneerCenter || Sites', sites: sites });
});



module.exports = router;