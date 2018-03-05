require('colors');
var express         = require('express'),
    morgan          = require('morgan')('dev'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    config          = require('./config'),
    clientSessions  = require('client-sessions'),
    Routes          = require('./routes'); // is now a function passed from routes.js


// connect to DB
mongoose.connect('mongodb://localhost/musicLessonStudio');

var app = express();

var sessionsMiddleware = clientSessions({
    cookieName: 'musician-cookie',  // front-end cookie name
    secret: config.cookieSecret, // the encryption password : keep this safe
    requestKey: 'session',    // req.session,
    cookie: {
        ephemeral: false,     // when true, cookie expires when browser is closed
        httpOnly: true,       // when true, the cookie is not accessible via front-end JavaScript
        secure: false         // when true, cookie will only be read when sent over HTTPS
    }
}) // encrypted cookies!

// Middleware
app.use(
  // morgan is already invoked above
  sessionsMiddleware,
  bodyParser.urlencoded({extended: true}),
  bodyParser.json(),
  express.static('public')
);

// gives routes.js use of express 'app' object
Routes(app);

app.server = app.listen(process.env.PORT || 80, ()=>{
  console.log(`Server running on ${process.env.PORT || 80}`.america);
})
