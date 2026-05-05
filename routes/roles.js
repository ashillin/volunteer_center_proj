const express = require('express');
const router = express.Router();
const Role = require('../models/role');

router.get('/', function(req, res, next) {
  const roles = Role.all;
  res.render('roles/index', { title: 'VolunteerCenter || Roles', roles: roles });
});

router.get('/form', async (req, res, next) => {
  res.render('roles/form', { title: 'VolunteerCenter || Roles' });
});

router.get('/edit', async (req, res, next) => {
  let roleIdx = req.query.id;
  let role = Role.get(roleIdx);
  res.render('roles/form', { title: 'VolunteerCenter || Roles', role: role, roleIdx: roleIdx  });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Role.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the role has been ${createdOrupdated}!`,
  };
  res.redirect(303, "/roles")
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'VolunteerCenter || Roles',
    role: Role.get(req.params.id),
  };
  res.render('roles/show', templateVars);
});

module.exports = router;