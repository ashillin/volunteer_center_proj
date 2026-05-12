const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const Assignment = require('../models/assignment');

router.get('/', async (req, res, next) => {
  const roles = await Role.all();
  res.render('roles/index', { title: 'VolunteerCenter || Roles', roles: roles });
});

router.get('/form', async (req, res, next) => {
    if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
  res.render('roles/form', { title: 'VolunteerCenter || Roles' });
});

router.get('/edit', async (req, res, next) => {
    if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
  let templateVars = { title: 'VolunteerCenter || Roles' }
  if (req.query.id) {
    let role = await Role.get(req.query.id)
    if (role) {templateVars['role'] = role}
  }
  res.render('roles/form', templateVars);
});

router.post('/upsert', async (req, res, next) => {
    if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
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
  const role = await Role.get(req.params.id);
  //   if (!role) {
  //   req.session.flash = {
  //     type: 'danger',
  //     intro: 'Error!',
  //     message: 'Role not found!',
  //   };
  //   res.redirect(303, '/roles');
  //   return;
  // }
  let templateVars = {
    title: 'VolunteerCenter || Roles',
    role: role,
  };
if (req.session.currentUser) {
    templateVars['assignment'] = await Assignment.get(
      req.session.currentUser.volunteerId,
      null, // siteId (if applicable)
      role.id
    );
  }
  
  res.render('roles/show', templateVars);
});

module.exports = router;