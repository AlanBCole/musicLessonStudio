var Musician = require('../models/musicianModel');


module.exports = {

  create: (req, res)=>{
    console.log('POST — /api/studio — create'.green, req.body);
    (new Musician(req.body)).save((err, doc)=>{
      if(err) {
        return res.send(err);
      }
      setTimeout(funciton(){
        res.send(doc);
      }, 2000);
    });
  },
  
  get: (req, res)=>{

  },
  update: (req, res)=>{

  },
  delete: (req, res)=>{

  }
}
