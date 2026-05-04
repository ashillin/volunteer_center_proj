//Framework Imports
const express = require('express');
const bodyParser = require('body-parser');


//Application Imports
const indexRouter = require('./routes/index');
const volunteersRouter = require('./routes/volunteers');
const sitesRouter = require('./routes/sites');

//Framework Setup
const app = express();
const port = 3000;
const handlebars = require('express-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));


//Application Setup
app.use('/', indexRouter);
app.use('/volunteers', volunteersRouter);
app.use('/sites', sitesRouter);


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