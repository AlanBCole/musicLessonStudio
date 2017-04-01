var Musician = require('../models/musicianModel');
var bcrypt = require('bcryptjs');

module.exports = {

  create: (req, res)=>{
    console.log('POST — /api/musician — create'.blue, req.body);
    (new Musician(req.body)).save((err, doc)=>{
      if(err) {
        return res.send(err);
      }
      res.send(doc);
    });
  },

  login : (req, res) => { // form post submission
    console.info('home.login.payload:', req.body);

    Musician.findOne({ email: req.body.email }, function (err, musician) {
      if (err) {
        console.log('MongoDB error:'.red, err);
          res.status(500).send("failed to find musician")
      }
      else if (!musician) {musician
              // forbidden
        console.log('No user found!');
        res.status(403).send("No user found");
      } else {
          console.log('home.login.musician', musician);
              // at this point, musician.password is hashed!
            bcrypt.compare(req.body.password, musician.password, function (bcryptErr, matched) {
                  // matched will be === true || false
              if (bcryptErr) {
                console.error('MongoDB error:', bcryptErr);
                res.status(500).send("mongodb error");
              } else if (!matched) {
                      // forbidden, bad password
                console.warn('Password did not match!');
                res.status(403).send("failed to log in");
              } else {
                req.session.uid = musician._id; // this is what keeps our musician session on the back end!
                res.send({ message: 'Login success' }); // send a success message
                  }
              });
          }
      });
  },

  get: (req, res)=>{

    if (req.params.id){

      Musician.findOne({_id: req.params.id}, (err, musician)=>{
        if(err) {
          return res.send(err);
        }
        res.send(musician);
        console.log('GET - /api/musician/:ID - READ'.cyan, req.body);
      });
    }
    else {
      Musician.find({}, (err, musicians)=>{
        if (err) {
          return res.send(err);
        }
        res.send(musicians);
        console.log('GET - /api/ballots - READ-all'.cyan, req.params);
      })
    }
  },

  update: (req, res)=>{
    Musician.update({_id: req.params.id}, req.body, (err, update)=>{
      if (err) {
        return res.send(err);
      }
      res.send(update)
      console.log('PUT - /api/musician - Update'.blue, req.params);
    });
  },

  // delete: (req, res)=>{
  //
  // }
}
