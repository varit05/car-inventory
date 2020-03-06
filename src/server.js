require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const ehb = require('express-handlebars');
const methodOverride = require('method-override');
let app = express();

// register middleware
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//Register router of the app
app.use('/', router);

const hbs = ehb.create({
  defaultLayout: 'main',
  helpers: {}
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.render('500');
});
// set custom port, else set port to 3000
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
});
