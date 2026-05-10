//Framework Imports
const express = require('express');
const bodyParser = require('body-parser');
const { credentials } = require('./config');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const csrf = require('csurf');


//Application Imports
const indexRouter = require('./routes/index');
const volunteersRouter = require('./routes/volunteers');
const sitesRouter = require('./routes/sites');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const assignmentsRouter = require('./routes/assignments');

//Framework Setup
const app = express();
const port = 3000;

var handlebars = require('express-handlebars').create({
  helpers: {
    eq: (v1, v2) => v1 == v2,
    ne: (v1, v2) => v1 != v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    someId: (arr, id) => arr && arr.some(obj => obj.id == id),
    in: (arr, obj) => arr && arr.some(val => val == obj),
    dateStr: (v) => v && v.toLocaleDateString("en-US")
  }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next();
})


// session configuration
//make it possible to use flash messages, and pass them to the view
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});
//make the current user available in views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});


//Application Setup
app.use('/', indexRouter);
app.use('/volunteers', volunteersRouter);
app.use('/sites', sitesRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/assignments', assignmentsRouter);


// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.send('<h1>404 - Sorry we have not made it this far yet, check back soon!</h1>');
})
// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.send('<h1>500 - Oh no! What did you do?!</h1>');
})
app.listen(port, () => console.log(
`Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`));