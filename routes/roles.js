const express = require('express');
const router = express.Router();
const Role = require('../models/role');

router.get('/', async (req, res, next) => {
  const roles = await Role.all();
  res.render('roles/index', { title: 'VolunteerCenter || Roles', roles: roles });
});

router.get('/form', async (req, res, next) => {
  res.render('roles/form', { title: 'VolunteerCenter || Roles' });
});

router.get('/edit', async (req, res, next) => {
  let templateVars = { title: 'VolunteerCenter || Roles' }
  if (req.query.id) {
    let role = await Role.get(req.query.id)
    if (role) {templateVars['role'] = role}
  }
  res.render('roles/form', templateVars);
});

router.post('/upsert', async (req, res, next) => {
 console.log('body: ' + JSON.stringify(req.body))
 await Role.upsert(req.body);
 req.session.flash = {
   type: 'info',
   intro: 'Success!',
   message: 'the role has been created!',
 };
 res.redirect(303, '/roles')
});

router.get('/show/:id', async (req, res, next) => {
  const roles = await Role.get(req.params.id);
  let templateVars = await {
    title: 'VolunteerCenter || Roles',
    role: roles,
    roleId: roles.id
  };
  res.render('roles/show', templateVars);
});

module.exports = router;