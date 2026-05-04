const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const volunteers = [
    "James S. A. Corey", "Craig Alanson", "Cixin Liu"
  ]
  res.render('volunteers/index', { title: 'VoluneerCenter || Volunteers', volunteers: volunteers });
});



module.exports = router;