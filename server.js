require('colors');
var express     = require('express'),
    morgan      = require('morgan')('dev'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    config      = require('./config'),
    Routes      = require('./routes'); // is now a function passed from routes.js


// connect to DB
mongoose.connect('mongodb://localhost/musicLessonStudio');

var app = express();

// Middleware
app.use(
  // morgan is already invoked above
  bodyParser.urlencoded({extended: true}),
  bodyParser.json(),
  express.static('public')
);

// gives routes.js use of express 'app' object
Routes(app);

app.server = app.listen(config.PORT || 3000, ()=>{
  console.log(`Server running on ${config.PORT || 3000}`.america);
})
