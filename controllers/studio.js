var Musician = require('../models/musicianModel');


module.exports = {

  create: (req, res)=>{
    console.log('POST — /api/musician — create'.green, req.body);
    (new Musician(req.body)).save((err, doc)=>{
      if(err) {
        return res.send(err);
      }
      res.send(doc);
    });
  },

  get: (req, res)=>{

  },
  update: (req, res)=>{

  },
  delete: (req, res)=>{

  }
}
