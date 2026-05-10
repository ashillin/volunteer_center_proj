const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');

 function notAuthorized(req, res, returnUrl) {
   req.session.flash = {
     type: 'danger',
     intro: 'Error!',
     message: `You are not authorized to edit this notice!`,
   };
   res.redirect(303, returnUrl);
   return;
 };

 router.get('/form', async (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect(303, '/users/login');
    return;
  }
  res.render('notices/form', {
    title: 'VolunteerCenter || Notices',
    siteId: req.query.siteId
  });
});

 router.get('/edit', async (req, res, next) => {
   let noticeId = req.query.id;
   let notice = await Notice.get(noticeId);
   if (! notice) {
     return notAuthorized(req, res, `/`);
   }
   if (! req.session.currentUser){
     return notAuthorized(req, res, `/`);
   }
   if (req.session.currentUser.id != notice.userId){
     return notAuthorized(req, res, `/sites/show/${notice.siteId}`);
   }
   res.render('notices/form', { title: 'BookedIn || Genres', notice: notice });
 });

 router.post('/upsert', async (req, res, next) => {
   console.log('body: ' + JSON.stringify(req.body));
   let notice = await Notice.get(req.body.id);
   if (notice && req.session.currentUser.volunteerId != notice.volunteerId){
     return notAuthorized(req, res, `/sites/show/${notice.siteId}`);
   }
   if (req.session.currentUser.volunteerId != req.body.volunteerId){
     return notAuthorized(req, res, `/sites/show/${req.body.siteId}`);
   }
   Notice.upsert(req.body);
   req.session.flash = {
     type: 'info',
     intro: 'Success!',
     message: `Your notice has been updated!`,
   };
   res.redirect(303, `/sites/show/${req.body.siteId}`);
 });


 module.exports = router;