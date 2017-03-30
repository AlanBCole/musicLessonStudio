var Musician = require('../models/musicianModel');


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

  get: (req, res)=>{

    if (req.params.id){
      console.log('GET - /api/musician/:ID - READ'.cyan, req.body);

      Musician.findOne({_id: req.params.id}, (err, musician)=>{
        if(err) {
          return res.send(err);
        }
        res.send(musician);
      });
    }
    else {
      console.log('GET - /api/ballots - READ-all'.cyan, req.params);
      Musician.find({}, (err, musicians)=>{
        if (err) {
          return res.send(err);
        }
        res.send(musicians);
      })
    }
  },

  update: (req, res)=>{
    console.log('PUT - /api/musician - Update'.green, req.params);
    Musician.update({_id: req.params.id}, req.body, (err, update)=>{
      if (err) {
        return res.send(err);
      }
      res.send(update)
    });
  },

  // delete: (req, res)=>{
  //
  // }
}
