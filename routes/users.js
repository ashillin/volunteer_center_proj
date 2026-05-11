const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Site = require('../models/site');
const Assignment = require('../models/assignment');
const Volunteer = require('../models/volunteer');
const db = require('../database');


function IsLoggedIn(req, res) {
  if (req.session.currentUser) {
    req.session.flash = {
      type: 'info',
      intro: 'Error!',
      message: 'You are already logged in',
    };
    res.redirect(303, '/');
    return true;
  }
  return false;
};

function isNotLoggedIn(req, res) {
  if (! req.session.currentUser) {
    req.session.flash = {type: 'info',intro: 'Err!',
      message: 'You are not logged in yet'};
    res.redirect(303, 'users/login');
    return true;
  }
  return false;
};

router.get('/register', async (req, res, next) => {
  if (IsLoggedIn(req, res)) {
    return;
  }
  res.render('users/register', { title: 'VolunteerCenter || Registration' });
});


router.post('/register', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  const user = await User.getByEmail(req.body.email)
  if (user) {
    res.render('users/register', {
      title: 'VolunteerCenter || Registration',
      flash: {
        type: 'danger',
        intro: 'Error!',
        message: `A user with this email already exists`}
    });
  } else {
    await User.add(req.body);
    const volunteer = await Volunteer.add({ 
      firstName: req.body.firstName, 
      lastName: req.body.lastName 
    });
        console.log('created volunteer:', volunteer); // ✅ add this
    await db.getPool().query(
      "UPDATE users SET volunteer_id = $1 WHERE email = $2",
      [volunteer.id, req.body.email]
    );
    const updatedUser = await User.getByEmail(req.body.email);
    console.log('updated user:', updatedUser); // ✅ add this
    await db.getPool().query(
    "UPDATE users SET volunteer_id = $1 WHERE email = $2",
    [volunteer.id, req.body.email]
    );
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: `the user has been created!`,
    };
    res.redirect(303, '/');
  }
});


router.get('/login', async (req, res, next) => {
  res.render('users/login', { title: 'VolunteerCenter || Login' });
});

router.post('/login', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  const user = await User.login(req.body)
  if (user) {
    req.session.currentUser = user
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'You are now logged in',
    };
    res.redirect(303, '/');
  } else {
    res.render('users/login', {
      title: 'VolunteerCenter || Login',
      flash: {
        type: 'danger',
        intro: 'Error!',
        message: `Wrong email and password combination or the user could not be found`}
    });
  }
});

router.post('/logout', async (req, res, next) => {
  delete req.session.currentUser
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'You are now logged out',
  };
  res.redirect(303, '/');
});

router.get('/profile', async (req, res, next) => {
  if (isNotLoggedIn(req, res)) {
    return
  }
  const assignments = await Assignment.AllForUser(req.session.currentUser);
  res.render('users/profile',
    { title: 'VolunteerCenter || Profile',
      user: req.session.currentUser,
      assignments: assignments });
});

module.exports = router;
